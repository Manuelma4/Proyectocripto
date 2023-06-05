const amqp = require ("amqplib")


const rabbitSettings = {
    protocol: 'amqp',
    //hostname: 'host.docker.internal',
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: '/',
    authMechanism: ['PLAIN','AMQPLAIN','EXTERNAL']
}


export async function producer(msg){              

    const queue = "queries"

    try{
        const conn = await amqp.connect(rabbitSettings)
        console.log("connection created...")


        const channel = await conn.createChannel()
        console.log("Channel created...")


        const res = await channel.assertQueue(queue, { durable: false });
        console.log("Queue created...")

        console.log("JSON that im going to enqueue: \n", msg)

        await channel.sendToQueue(queue,Buffer.from(JSON.stringify(msg)))

        console.log("enqueued succesfully")

    }catch(err){
        console.log("Error at producer");
        console.error(`Error -> ${err}`);
    }
}