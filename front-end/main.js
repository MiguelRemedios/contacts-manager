import "core-js/stable";
import "regenerator-runtime/runtime";
import Login from "./modules/Login";
import Contact from "./modules/Contact";
// import "./assets/css/style.css";

const signUp = new Login(".form-signUp");
const signIn = new Login(".form-signIn");

signUp.init();
signIn.init();

const contact = new Contact(".contact");

contact.init();
