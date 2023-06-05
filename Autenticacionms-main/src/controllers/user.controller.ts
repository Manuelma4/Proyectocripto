import { Request, Response } from 'express';
import User from '../models/user.model';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { tokenToString } from 'typescript';


const userController = {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or paasword' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      const secretOrPrivateKey: jwt.Secret = process.env.JWT_SECRET ?? 'defaultSecret';
      const token = jwt.sign({ username }, secretOrPrivateKey, { expiresIn: '1h',  algorithm: 'HS256'  });
      console.log("decoded token in login", token);
      user.email = token;//save token in email(later we can change this)
      await user.save();
      res.status(200).json(user);//return user with new token to be able to verify it later from the frontend

    } catch (error) {
      res.status(500).json({ error: "Error" });
    }
  },

  async loginVerify(req: Request, res: Response){
    try {
      const { email, username } = req.body;//the email is the token that was created at login
      const secretOrPrivateKey: jwt.Secret = process.env.JWT_SECRET ?? 'defaultSecret';
      const decodedToken = jwt.verify(email, secretOrPrivateKey, {  algorithms: ['HS256'] });
      console.log("decoded token in verify:", decodedToken);
      //if token is ok return true
      return res.status(200).json({msg:true});

    } catch (error) {
      //token is not valid, malformed or expired
     return res.status(200).json({ msg:false});
    }
  },

  async changePassword(req: Request, res: Response) {
    try {
      const { username, Password, newPassword } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      const isPasswordValid = await bcrypt.compare(Password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Fallo al cambiar la contraseña' });
    }
  },

  async logout(req: Request, res: Response) {
    try {
      const {username} = req.body;
      const user = await User.findOne({ username });
      if(!user){
        return res.status(401).json({msg:false});
      }
      //delete the token given at login
      user.email = user.password;//make the token the password hash for uniqueness
      await user.save();
      //successful logout
      res.status(200).json({ msg: true});
    } catch (error) {
      res.status(500).json({ msg: false });
    }
  },
  async getAll(req: Request, res: Response) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'ErrorgetAll' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { idRol, password, email, username } = req.body;

      // Check if username already exists
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Check if email already exists
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Find the last user in the database to increment the idUsuario
      const lastUser = await User.findOne().sort({ _id: -1 });
      const idUsuario = lastUser ? lastUser.idUsuario + 1 : 1;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ idUsuario, username, idRol, password: hashedPassword, email });
      await user.save();
      res.status(201).json({ user: user });
    } catch (error) {
      res.status(500).json({ error: 'ErrorCreate' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { idUsuario } = req.params;
      const user = await User.findOne({idUsuario});
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Errorgetbyid' });
    }
  },

  async getByUser(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error getting user by username' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { idUsuario } = req.params;
      const { username, idRol, password, email } = req.body;
      const user = await User.findOne({ idUsuario }).populate('role');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.username = username;
      user.idRol = idRol;
      user.password = password;
      user.email = email;
      await user.save();
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Errorupdate' });
    }
  }
  ,

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete({id});
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error); // registrar el error en la consola
      res.status(500).json({ error: 'Error deleting user' });
    }
  }
};

export default userController;