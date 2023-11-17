import { useState, useEffect } from 'react';
import { pubsub } from '../utils/pubsub';

pubsub.subscribe({ topics: 'myTopic' }).subscribe({
  next: (data) => console.log('Message received', data),
  error: (error) => console.error(error),
  complete: () => console.log('Done')
});

