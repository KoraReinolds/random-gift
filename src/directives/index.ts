import focusDirective from "./focus"
import tooltipDirective from "./tooltip"

const directives = (app: any) => {
  focusDirective(app)
  tooltipDirective(app)
}

export default directives
