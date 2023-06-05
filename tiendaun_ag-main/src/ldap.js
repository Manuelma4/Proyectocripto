
import { ldap_url } from './tiendaun/server';
import { ldap_port } from './tiendaun/server';

const ldap =  require('ldapjs');


export class Ldap {
    constructor(username, password){
        this.password = password;
        this.userDn = `cn=${username}, ou=sa, dc=tiendaun, dc=co`;
    }

 async connect(){
    //connect
    this.client = ldap.createClient({
        url: ldap_url + ':' + ldap_port,
    });


    this.client.on('error', (err) => {
        console.error('LDAP CONNECTION ERROR ', err);
        this.client.unbind();
    });

  }

  authenticate() {
    return new Promise((resolve, reject) => {
      this.client.bind(this.userDn, this.password, async (err) => {
        if (err) {
          console.log('*LDAP Authentication error', err, this.userDn);
          this.client.unbind();
          reject(err); 
        } else {
          console.log('*LDAP and TOKEN Authentication successful', this.userDn);
          this.client.unbind();
          resolve(); 
        }
      });
    });
  }


}
