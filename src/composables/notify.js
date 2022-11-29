// outside of a Vue file
import { Notify } from 'quasar'

const notify = (message, color = 'primary', icon = false, position = 'top-right', avatar = false, dismisable = false) => {
  Notify.create({
    message,
    icon,
    color,
    position,
    avatar,
    actions: () => dismisable ? [
      { icon: 'cancel', color: 'white', handler: () => { /* ... */ } }
    ] : false,
  });
};
export default notify;