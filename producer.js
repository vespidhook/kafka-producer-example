import { Kafka } from 'kafkajs'
import { randomUUID } from "node:crypto";

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['on-tapir-11509-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: 'b24tdGFwaXItMTE1MDkkJUwm7el6ubuNFPXsEtyITK5wZKx-AFAb7BN9-_gIGdk',
      password: '0663cf927a2e4d9f8d6896b881b8845f',
    },
    ssl: true,
  })

  const producer = kafka.producer()

  await producer.connect()

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade',
          category: 'social',
          recipientId: randomUUID(),
        })
      }
    ]
  })

  await producer.disconnect()
}

bootstrap()