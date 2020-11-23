export class Component {
  getTemplate(){
    const template = document.createElement('div');
    template.innerHTML = '<div class="default"></div>';
    return template;
  }

  mounted(){
    console.log('render component');
  }

  destroy(){
    console.log('destroy component');
  }
}
