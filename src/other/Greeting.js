import Name from "./Naming"
export function Greeting(props) {
  return (
    <p>
      Hello <Name name="John" /> {props.surname}
    </p>
  );
}
export function Bye() {
  return (
    <p>
      Bye <Name name="Arthur" />
    </p>
  )
}
