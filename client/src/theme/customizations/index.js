import Card from "./Card";
import Tabs from "./Tabs";
import Link from "./Link";
import TextField from "./TextField";
import Typography from "./Typography";
import Icons from "./Icons";

function customizeComponents(theme) {
  return { ...Tabs(theme), ...Card(theme), ...Link(theme), ...TextField(theme), ...Typography(theme), ...Icons(theme) };
}

export default customizeComponents;
