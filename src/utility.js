import data from './message-data.json';

const utility = {
  getCurrentUser() {
    return data.user;
  },

  generateUUID() {
    return Math.floor(Math.random() * 100000).toString();
  }
}


export default utility;
