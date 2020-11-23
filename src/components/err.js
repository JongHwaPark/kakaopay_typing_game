import {Component} from './component'
import "../style/err.css"

class ErrComponent extends Component{
  getTemplate(){
    const template = document.createElement('div');
    template.innerHTML = `
    <div class="error">
      <h2>404</h2>
      <p>The page you requested was not found.</p>
      <a href="/">Back to Home</a>
    </div>
      `;
    return template;
  }
}

export default ErrComponent;
