
/* The statement `import * as SecureStore from 'expo-secure-store';` is importing the entire module
`expo-secure-store` and assigning it to the variable `SecureStore`. This allows you to access the
functions and variables exported by the `expo-secure-store` module using the `SecureStore` variable. */
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * The above type represents a service with a slug, name, action and reaction arrays, and decoration
 * properties.
 * @property {string} slug - A unique identifier for the service. It is typically a string that is used
 * to identify and reference the service in a system or application.
 * @property {string} name - The name property is a string that represents the name of the service.
 * @property {string[]} action - The "action" property is an array of strings that represents the
 * actions that can be performed by the service.
 * @property {string[]} reaction - The `reaction` property is an array of strings that represents the
 * possible reactions or actions that can be performed in response to a specific service.
 * @property decoration - The "decoration" property is an object that contains two properties:
 * "backgroundColor" and "logoUrl".
 */
export type Service = {
    slug: string;
    name: string;
    actions: Action[];
    reactions: Reaction[];
    decoration: {
        backgroundColor: string;
        logoUrl: string;
    }
}

/**
 * The above type represents an action with a slug, name, description, and inputs.
 * @property {string} slug - The slug property is a string that represents a unique identifier for the
 * action. It is typically used as a short and URL-friendly version of the action's name.
 * @property {string} name - The name property is a string that represents the name of the action.
 * @property {string} description - The `description` property is a string that provides a brief
 * explanation or summary of the action. It describes what the action does or what its purpose is.
 * @property {Input[]} inputs - The `inputs` property is an array of `Input` objects. Each `Input`
 * object represents an input parameter for the action.
 */
export type Action = {
    slug: string;
    name: string;
    description: string;
    inputs: Input[];
}

/**
 * The above type represents a reaction with a slug, inputs, and a placeholder.
 * @property {string} slug - The `slug` property is a string that represents a unique identifier for a
 * reaction. It is typically used to reference a specific reaction in code or data structures.
 * @property {string[]} inputs - The `inputs` property is an array of strings that represents the input
 * fields required for the reaction. Each string in the array represents the type of input field, such
 * as text, number, or date.
 * @property {string} placeholder - The `placeholder` property is a string that represents the text
 * that is displayed in an input field before the user enters any value. It is typically used as a hint
 * or example to guide the user on what type of input is expected.
 */
export type Reaction = {
    slug: string;
    name: string;
    description: string;
    inputs: Input[];
    placeholder: string;
}

/**
 * The above type represents an input field with properties for name, label, and type.
 * @property {string} name - A string representing the name of the input field. This is typically used
 * as the identifier for the input when submitting a form or accessing its value in JavaScript.
 * @property {string} label - The "label" property is a string that represents the label or title of
 * the input field. It is typically used to provide a description or prompt for the user to understand
 * what information is expected to be entered in the input field.
 * @property {string} type - The "type" property in the "Input" type represents the type of input field
 * that will be rendered. It can be a string value such as "text", "number", "email", "password", etc.,
 * indicating the type of input field to be displayed.
 */
export type Input = {
    name: string;
    label: string;
    type: string;
}

const getInput = (input : any) : Input[] => {
    let inputs : Input[] = [];
    let i : number = 0;
    while (input[i]) {
        let tmp : Input = {name : input[i].name, label : input[i].label, type : input[i].type};
        inputs.push(tmp);
        i++;
    }
    return inputs;
}

const getAction = (action : any) : Action[] => {
    let actions : Action[] = [];
    let i : number = 0;
    while (action[i]) {
        let tmp : Action = {slug : action[i].slug, inputs : getInput(action[i].inputs), name : action[i].name, description : action[i].description};
        actions.push(tmp);
        i++;
    }
    return actions;
}

const getReaction = (action : any) : Reaction[] => {
    let reactions : Reaction[] = [];
    let i : number = 0;
    while (action[i]) {
        let tmp : Reaction = {slug : action[i].slug, inputs : getInput(action[i].inputs), name : action[i].name, description : action[i].description, placeholder : action[i].placeholder};
        reactions.push(tmp);
        i++;
    }
    return reactions;
}

/**
 * The function `ServiceInfo` is an asynchronous function that retrieves service information from an
 * API using a provided slug and returns a `Service` object.
 * @param {string} slug - The `slug` parameter is a string that represents a unique identifier for a
 * service. It is used to fetch information about a specific service from the server.
 * @returns The function `ServiceInfo` returns a `Promise` that resolves to a `Service` object.
 */
const ServiceInfo = async (slug : string): Promise<Service> => {
    try {
        const token = await SecureStore.getItemAsync('token_api');
        const serverAddress = await AsyncStorage.getItem('serverAddress');
        const response = await fetch(`${serverAddress}/service/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        console.log("Status : ", response.status);
        if (response.status != 200) {
            return null;
        }
        const json = await response.json();
        let service : Service = {slug : json.data.slug, name : json.data.name, actions : null, reactions : null, decoration : {backgroundColor : json.data.decoration.backgroundColor, logoUrl : json.data.decoration.logoUrl}};
        service.actions = getAction(json.data.actions);
        service.reactions = getReaction(json.data.reactions);
        console.log("Service : ", service);
        return service;
    } catch (error) {
        console.error("An error occur : ", error);
        return null;
    }
}

/* The statement `export default ServiceInfo;` is exporting the `ServiceInfo` function as the default export
of the module. This means that when another module imports this module, they can import the
`ServiceInfo` function directly without having to specify its name. For example, in another module, you
can import the `ServiceInfo` function like this: `import ServiceInfo from './ServiceInfo';`. */
export default ServiceInfo;
