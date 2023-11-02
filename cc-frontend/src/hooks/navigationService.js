// navigationService.js
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export function navigateTo(path) {
  history.push(path);
}

export default history;
