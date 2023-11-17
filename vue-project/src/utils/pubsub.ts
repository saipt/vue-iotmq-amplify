import { PubSub } from '@aws-amplify/pubsub';
export const pubsub = new PubSub({
    region: 'ap-south-1',
    endpoint:
      'wss://a2vh905c4kwt1m-ats.iot.ap-south-1.amazonaws.com/mqtt'
  });

