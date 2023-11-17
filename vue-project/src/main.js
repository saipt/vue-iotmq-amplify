import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
Amplify.configure(amplifyconfig);
import { fetchAuthSession } from 'aws-amplify/auth';
import { PubSub } from '@aws-amplify/pubsub';

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

  pubsub.subscribe({ topics: 'myTopic' }).subscribe({
    next: (data) => console.log('Message received', data),
    error: (error) => console.error(error),
    complete: () => console.log('Done')
  });
pubsub.publish({ topics: 'myTopic', message: { msg: 'Hello to all subscribers!' }}).then(() => console.log("Published! .....")).catch(console.error);
createApp(App).mount('#app')
