const focusDirective = (app: any) => {
  app.directive('focus', {
    mounted(el: any) {
      el.focus()
    }
  })
}
  
export default focusDirective  