import { Err } from '../components'

const Router = {
  setRouter:function(routes){
    this.routes = {};
    this.current = '/';
    this.defaultPath = '/';
    for(const route of routes){
      this.routes[route.path] = route.content;
      if(route.default === true) this.defaultPath = route.path;
    }

    this.navigateTo(this.defaultPath);

    window.addEventListener("popstate", event => {
      if(!event.state) return false;
      this.routes[this.current].destroy();
      this.current = event.state.path;
      this.loadContent(this.current);
    });
  },
  loadContent:function(path){
    const content = this.routes[path] || new Err();
    const rootTarget = 'my-app-root';
    const rootElement = document.createElement('div');
    rootElement.setAttribute('id', rootTarget);
    rootElement.appendChild(content.getTemplate());
    document.body.replaceChild(rootElement, document.getElementById(rootTarget));
    content.mounted();
  },

  navigateTo:function(path){
    this.routes[this.current].destroy();
    this.current = path;
    window.history.pushState({path}, `${path}`,path);
    this.loadContent(path);
  }
};

export default Router;
