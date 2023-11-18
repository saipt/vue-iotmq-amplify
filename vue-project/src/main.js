import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
Amplify.configure(amplifyconfig);
import { fetchAuthSession } from 'aws-amplify/auth';
import { PubSub } from '@aws-amplify/pubsub';

import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';
import { Hub } from 'aws-amplify/utils';

window.LOG_LEVEL = 'DEBUG'; 
console.log("----")
fetchAuthSession().then((info) => {
  const cognitoIdentityId = info.identityId;
  console.log("----",cognitoIdentityId)
});

// Apply plugin with configuration
const pubsub = new PubSub({
    region: 'ap-south-1',
    endpoint:
      'wss://a2vh905c4kwt1m-ats.iot.ap-south-1.amazonaws.com/mqtt'
  });
console.log("Pubsub outpu", pubsub)

Hub.listen('pubsub', (data) => {
  const { payload } = data;
  if (payload.event === CONNECTION_STATE_CHANGE) {
    const connectionState = payload.data.connectionState;
    console.log(connectionState);
  if (connectionState === "Connected"){
    pubsub.publish({ topics: 'myTopic', message: { msg: 'Message from Amplify console' }}).then(() => console.log("Published! .....")).catch(console.error);
  }
  }
});
pubsub.subscribe({ topics: 'myTopic' }).subscribe({
  next: (data) => console.log('Message received', data),
  error: (error) => console.error(error),
  complete: () => console.log('Done')
  });
createApp(App).mount('#app')
