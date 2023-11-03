# Mobile-Api

Here we have all components for API calls.
* [/action/\{slug\}](#action-tsx) [**GET**]
* [/action/info/\{slug\}](#actioninfo-tsx) [**GET**]
* [/reaction/\{slug}/\{actionSlug}](#placeholders-tsx) [**GET**]
* [/reaction/info/\{slug}](#reactioninfo-tsx) [**GET**]
***
* [/applet](#applet-tsx) [**POST**]
* [/applet/\{id}](#appletid-tsx) [**GET**]
* [/applet/\{id}](#deleteapplet-tsx) [**DELETE**]
* [/applet/\{id}](#appletpatch-tsx) [**PATCH**]
* [/applet/me](#appletme-tsx) [**GET**]
***
* [/service](#services-tsx) [**GET**]
* [/service/\{slug}](#appletdetails-tsx) [**GET**]
* [/service/\{slug}/oauth2](#oauth-tsx) [**POST**]
* [/service/\{slug}/oauth2](#oauthlogout-tsx) [**DELETE**]
* [/service/\{slug}/oauth2/token](#servicetoken-tsx) [**GET**]
***
* [/user/verify](#autologin-tsx) [**GET**]
* [/user/login](#login-tsx) [**POST**]
* [/user/register](#register-tsx) [**POST**]
* [/user/me](#userinfos-tsx) [**GET**]
* [/user/me](#patchuser-tsx) [**PATCH**]


## [Action.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/Action.tsx)

The function `Action` is an asynchronous function that takes a `slug` parameter and returns a promise that resolves to an array of `Input` objects. It's used to have all inputs required by an action.

```javascript
const Action = async (slug : string): Promise<any[]>
```

We start by getting the `serverAddress` in the Async storage and the `token` in the Secure storage

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

Then we ask the server on the route `GET /action/{slug}` to get the action info and turn it into a json.

```javascript
const response : Response = await fetch(`${serverAddress}/action/${slug}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
});
const json : any = await response.json();
```

Now we will create a list of object that will store all infos for each inputs. For each inputs we will store :
* The name
* The label
* The type of the input (`TEXT`, `NUMBER`, `SELECT`, ...)
* The options (only if the case that it's a type `SELECT`
```javascript
let inputs : any[] = [];
for (let i = 0; i < json.data.inputs.length; i++)
{
    let tmp : any  = {name : json.data.inputs[i].name, label : json.data.inputs[i].label, type : json.data.inputs[i].type, options : json.data.inputs[i].options};
    inputs.push(tmp);
}
```
We return then the list of inputs

```javascript
return inputs;
```

In the case that the request failed we catch errors

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return null;
```

For more information about this file you can check his complete code here : [Action.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/Action.tsx)

## [ActionInfo.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/ActionInfo.tsx)

The function `ActionInfo` is an asynchronous function that retrieves information about an action using a provided slug, including authentication and error handling.

```javascript
const ActionInfo = async (slug : string): Promise<any>
```


We start by getting the `serverAddress` in the Async storage and the `token` in the Secure storage

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

Then we ask the server on the route `GET /action/info/{slug}` to get the action info and turn it into a json.

```javascript
const response : Response = await fetch(`${serverAddress}/action/${slug}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
});
const json : any = await response.json();
```

We return then the data from the json.

```javascript
return json.data;
```

In the case that the request failed we catch errors

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return null;
```


For more information about this file you can check his complete code here : [ActionInfo.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/ActionInfo.tsx)

## [Placeholders.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/Placeholders.tsx)

The function `PlaceHolders` is an asynchronous function that retrieves placeholders from a server based on a given slug and actionSlug, using a token for authorization.
```javascript
const PlaceHolders = async (slug : string, actionSlug : string): Promise<Dict>
``` 

We start by getting the `serverAddress` in the Async storage and the `token` in the Secure storage

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

Then we ask the server on the route `GET /reaction/{slug}/{actionSlug}` to get the reaction info.

```javascript
const response : Response = await fetch(`${serverAddress}/reaction/${slug}/${actionSlug}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
});
```

We will then create a function to return the placeholders in a dictionnary

```javascript
export type Dict = {[key: string]: string}

const createDictionary = (placeholders : any) : Dict => {
    let dict : Dict = {};
    for (let key in placeholders) {
        dict[key] = placeholders[key]
    }
    return dict;
}
```

We can now return the dictionnary of placeholders
```javascript
return createDictionary(json.data.placeholders);
```

In the case that the request failed we catch errors

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return null;
```
For more information about this file you can check his complete code here : [Placeholders.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/Placeholders.tsx)

## [ReactionInfo.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/ReactionInfo.tsx)

The function `ReactionInfo` is an asynchronous function that retrieves information about an action using a provided slug, including authentication and error handling.

```javascript
const ReactionInfo = async (slug : string): Promise<any>
```


We start by getting the `serverAddress` in the Async storage and the `token` in the Secure storage

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

Then we ask the server on the route `GET /reaction/info/{slug}` to get the action info and turn it into a json.

```javascript
const response : Response = await fetch(`${serverAddress}/action/${slug}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
});
const json : any = await response.json();
```

We return then the data from the json.

```javascript
return json.data;
```

In the case that the request failed we catch errors

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return null;
```


For more information about this file you can check his complete code here : [ReactionInfo.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/ReactionInfo.tsx)


## [Applet.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/Applet.tsx)

The function `Applet` is an asynchronous function that takes in various parameters related to an applet, logs them to the console, and makes a POST request to a server with the provided data. Here are the different parameters:
* `name` is a `string`. It's literally the name of the applet you want to create.
* `actionSlug` is a `string`. It's the `slug` of the action of the applet.
* `actionInputs` is an `Input[]`. The `actionInputs` parameter is an array of objects that represent the inputs required for the action.
* `actionResp` is an `Array<any>`. The `actionResp` parameter is an array of any type that represents the response data from the action. It is used to populate the values of the action inputs in the request body. Each element in the `actionResp` array corresponds to an input in the `actionInputs` array.
* `reactionSlug` is a `string[]`. The `reactionSlug` parameter is an array of strings that represents the slugs of the reactions for the applet. Each reaction slug identifies a specific action that will be triggered as a reaction to the main action of the applet.
* `reactionInputs` is an `Input[][]`. The `reactionInputs` parameter is a 2-dimensional array of type `Input`. Each inner array represents the inputs required for a specific reaction. The outer array represents the reactions themselves. So, for each reaction, you have an array of inputs.
* `reactionResp`is an `Array<any>`. The parameter `reactionResp` is an array of arrays. Each inner array represents the response values for a specific reaction. The outer array represents the response values for all the reactions.

This function return `Promise<boolean | any>`, a boolean false in case of error, or the data return by the API if it works.

```javascript
const Applet = async (name : string, actionSlug : string, actionInputs : Input[], actionResp : Array<any>,  reactionSlug : string[], reactionInputs : Input[][], reactionResp : Array<any>): Promise<boolean | any> => {
```

We start by getting the `serverAddress` in the Async storage and the `token` in the Secure storage

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```
Then we build the body of the request with 6 differents parameters :
* `notifUser` that is set to true to enable notifications.
* `name` that is the name of the applet, it is in parameter.
* `actionSlug` that is the action slug of the applet given, it is in parameter.
* `enabled` that is set to true to enable the applet.
* `actionInputs` that is a list of inputs and for each input it have : `name`, `type` and `value`
* `reactions` that is a list of reactions including for each one :
    * `reactionSlug` that is the reaction slug of the current reaction.
    * `reactionInputs` that is a list of inputs and for each input it have : `name`, `type` and `value`

So the `actionInputs` will look like bellow, we will map into our `actionInputs` given in parameters and we will take the `name`, `label` and `type` of the current input, but for the `value` we will take the response in `actionResp` at the same index.

```javascript
actionInputs: actionInputs.map((input : Input, index : number) => {
    return {name: input.name, label : input.label, type : input.type, value : actionResp[index]}
})
```

For the `reactions`, we will map two times, in a first time into our reactions, and for each reactions we will map on his inputs to get the `name`, `label` and `type` of the current input and for the `value` we will take it in the `reactionResp` given in parameter, at the first index is the reaction index and then the input index.

```javascript
reactions: reactionSlug.map((reaction : string, index : number) => { return {
    reactionSlug: reaction,
    reactionInputs: reactionInputs[index].map((input : Input, indexr : number) => {
        return {name: input.name, label : input.label, type : input.type, value : reactionResp[index][indexr]}
    })
}})
```

We can now send the request to `POST /applet` and get the result in json.

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
const response : Response = await fetch(`${serverAddress}/applet`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
        notifUser: true,
        name: name,
        actionSlug: actionSlug,
        enabled: true,
        actionInputs: actionInputs.map((input : Input, index : number) => {
            return {name: input.name, label : input.label, type : input.type, value : actionResp[index]}
        }),
        reactions: reactionSlug.map((reaction : string, index : number) => { return {
            reactionSlug: reaction,
            reactionInputs: reactionInputs[index].map((input : Input, indexr : number) => {
                return {name: input.name, label : input.label, type : input.type, value : reactionResp[index][indexr]}
             })
        }})
    }, null, 4)
});
const json : any = await response.json();
if (json.data == undefined) {
    alert("Error " + response.status + " : " + json.detail)
    return false;
}
return json.data;
```
In the case that the request failed we catch errors

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return null;
```

For more information about this file you can check his complete code here : [Applet.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/Applet.tsx)

## [AppletID.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/AppletID.tsx)

The `AppletID` components is used to get informations about an applet and take the applet `id` as parameter

```javascript
const AppletID  = async (id : string) : Promise<any>
```

We start by getting the `serverAddress` in the Async storage and the `token` in the Secure storage

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

We can now request the API at `GET /applet/{id}` and turn the result in a json.

```javascript
const response: Response =
    await fetch(`${serverAddress}/applet/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
const json: any = await response.json();
```

Now we just have to return the json data
```javascript
return json.data;
```

In the case that the request failed we catch errors

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return null;
```

For more information about this file you can check his complete code here : [AppletID.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/AppletID.tsx)

## [DeleteApplet.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/DeleteApplet.tsx)

The call `DeleteApplet` is used to delete an applet by his `id`.

```javascript
const DeleteApplet  = async (id: number) : Promise<any>
```

We start by getting the `serverAddress` in the Async storage and the `token` in the Secure storage

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

We can now request the API at `DELETE /applet/{id}`.

```javascript
const response: Response =
    await fetch(`${serverAddress}/applet/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
```

Now we just have to return the response
```javascript
return response;
```

In the case that the request failed we catch errors

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return null;
```

For more information about this file you can check his complete code here : [DeleteApplet.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/DeleteApplet.tsx)

## [AppletInfos.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/AppletInfos.tsx)

The `AppletInfos` components is used to get informations about an applet and take the applet `id` as parameter

```javascript
const AppletInfos  = async (id : string) : Promise<any>
```

We start by getting the `serverAddress` in the Async storage and the `token` in the Secure storage

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

We can now request the API at `GET /applet/{id}` and turn the result in a json.

```javascript
const response: Response =
    await fetch(`${serverAddress}/applet/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
const json: any = await response.json();
```

Now we just have to return the json data
```javascript
return json.data;
```

In the case that the request failed we catch errors

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return null;
```

For more information about this file you can check his complete code here : [AppletInfos.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/AppletInfos.tsx)

## [AppletPatch.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/AppletPatch.tsx)

The function `AppletPAtch` is an asynchronous function that takes in various parameters related to an applet, logs them to the console, and makes a PATCH request to a server with the provided data. Here are the different parameters:
* `name` is a `string`. It's literally the name of the applet you want to create.
* `actionSlug` is a `string`. It's the `slug` of the action of the applet.
* `actionInputs` is an `Input[]`. The `actionInputs` parameter is an array of objects that represent the inputs required for the action.
* `actionResp` is an `Array<any>`. The `actionResp` parameter is an array of any type that represents the response data from the action. It is used to populate the values of the action inputs in the request body. Each element in the `actionResp` array corresponds to an input in the `actionInputs` array.
* `reactionSlug` is a `string[]`. The `reactionSlug` parameter is an array of strings that represents the slugs of the reactions for the applet. Each reaction slug identifies a specific action that will be triggered as a reaction to the main action of the applet.
* `reactionInputs` is an `Input[][]`. The `reactionInputs` parameter is a 2-dimensional array of type `Input`. Each inner array represents the inputs required for a specific reaction. The outer array represents the reactions themselves. So, for each reaction, you have an array of inputs.
* `reactionResp`is an `Array<any>`. The parameter `reactionResp` is an array of arrays. Each inner array represents the response values for a specific reaction. The outer array represents the response values for all the reactions.
* `id` is the number that is the id of the applet

This function return `Promise<boolean | any>`, a boolean false in case of error, or the data return by the API if it works.

```javascript
const AppletPatch = async (name : string, actionSlug : string, actionInputs : Input[], actionResp : Array<any>,  reactionSlug : string[], reactionInputs : Input[][], reactionResp : Array<any>, id : number): Promise<boolean | any> => {
```

We start by getting the `serverAddress` in the Async storage and the `token` in the Secure storage

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```
Then we build the body of the request with 6 differents parameters :
* `notifUser` that is set to true to enable notifications.
* `name` that is the name of the applet, it is in parameter.
* `actionSlug` that is the action slug of the applet given, it is in parameter.
* `enabled` that is set to true to enable the applet.
* `actionInputs` that is a list of inputs and for each input it have : `name`, `type` and `value`
* `reactions` that is a list of reactions including for each one :
    * `reactionSlug` that is the reaction slug of the current reaction.
    * `reactionInputs` that is a list of inputs and for each input it have : `name`, `type` and `value`

So the `actionInputs` will look like bellow, we will map into our `actionInputs` given in parameters and we will take the `name`, `label` and `type` of the current input, but for the `value` we will take the response in `actionResp` at the same index.

```javascript
actionInputs: actionInputs.map((input : Input, index : number) => {
    return {name: input.name, label : input.label, type : input.type, value : actionResp[index]}
})
```

For the `reactions`, we will map two times, in a first time into our reactions, and for each reactions we will map on his inputs to get the `name`, `label` and `type` of the current input and for the `value` we will take it in the `reactionResp` given in parameter, at the first index is the reaction index and then the input index.

```javascript
reactions: reactionSlug.map((reaction : string, index : number) => { return {
    reactionSlug: reaction,
    reactionInputs: reactionInputs[index].map((input : Input, indexr : number) => {
        return {name: input.name, label : input.label, type : input.type, value : reactionResp[index][indexr]}
    })
}})
```

We can now send the request to `PATCH /applet/{id}` and get the result in json.

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
const response : Response = await fetch(`${serverAddress}/applet/${id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
        notifUser: true,
        name: name,
        actionSlug: actionSlug,
        enabled: true,
        actionInputs: actionInputs.map((input : Input, index : number) => {
            return {name: input.name, label : input.label, type : input.type, value : actionResp[index]}
        }),
        reactions: reactionSlug.map((reaction : string, index : number) => { return {
            reactionSlug: reaction,
            reactionInputs: reactionInputs[index].map((input : Input, indexr : number) => {
                return {name: input.name, label : input.label, type : input.type, value : reactionResp[index][indexr]}
             })
        }})
    }, null, 4)
});
const json : any = await response.json();
if (json.data == undefined) {
    alert("Error " + response.status + " : " + json.detail)
    return false;
}
return json.data;
```
In the case that the request failed we catch errors

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return null;
```

For more information about this file you can check his complete code here : [AppletPatch.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/AppletPatch.tsx)

## [UpdateApplet.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/UpdateApplet.tsx)

Update an applet with a specific ID by sending a PATCH request to the server. with three function sending respectivly :
* the `name` string
* the `enable` boolean
* the `notifUser` boolean

```javascript
const UpdateAppletTitleWithID = async (id: string, title: string ): Promise<void>
const UpdateAppletEnableWithID = async (id: string, enable: boolean ): Promise<void>
const UpdateAppletNotifWithID = async (id: string, notif: boolean ): Promise<void>
```

For both, we start by getting the `serverAddress` in the Async storage and the `token` in the Secure storage

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

We can now request the API at `PATCH /applet/{id}` and turn the result in a json.

```javascript
const response: Response =
    await fetch(`${serverAddress}/applet/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
        body: JSON.stringify({
             name   : title, // or enabled   : enable or notifUser   : notif
         })
    });
const json: any = await response.json();
```
Now we just have to return the data from the json
```javascript
return json.data;
```

In the case that the request failed we catch errors

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return null;
```

For more information about this file you can check his complete code here : [UpdateApplet.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/UpdateApplet.tsx)

## [AppletMe.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/AppletMe.tsx)

The `AppletMe` components is used to get informations about the applets of the user

```javascript
const AppletMe  = async () : Promise<any>
```

We start by getting the `serverAddress` in the Async storage and the `token` in the Secure storage

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

We can now request the API at `GET /applet/me` and turn the result in a json.

```javascript
const response: Response =
    await fetch(`${serverAddress}/applet/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
const data: any = await response.json();
```

Now we just have to return the data
```javascript
return data;
```

In the case that the request failed we catch errors

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return null;
```

For more information about this file you can check his complete code here : [AppletMe.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/AppletMe.tsx)

## [Services.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/Services.tsx)

The function `Services` is an asynchronous function that retrieves a list of applets from a server and returns them as an array of `Applet` objects.

```javascript
const Services = async (): Promise<Applet[]> 
```

```javascript
export type Applet = {
    slug: string;
    name: string;
    action : boolean;
    reaction: boolean;
    decoration: {
        backgroundColor: string;
        logoUrl: string;
    }
}
```

We start by getting the `serverAddress` in the Async storage and the `token` in the Secure storage

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

We can now request the API at `GET /service` and turn the result in a json.

```javascript
const response: Response =
    await fetch(`${serverAddress}/service`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
const json: any = await response.json();
```

Now we will loop in the data to fill an `Applet` arrray

```javascript
let applets: Applet[] = [];
for (let i : number = 0; i < json.data.length; i++) {
    let action : boolean = (json.data[i].actions.length > 0);
    let reaction : boolean = (json.data[i].reactions.length > 0);
    let tmp : Applet = {slug : json.data[i].slug, name : json.data[i].name, action : action, reaction : reaction, decoration : {backgroundColor : json.data[i].decoration.backgroundColor, logoUrl : json.data[i].decoration.logoUrl}};
    applets.push(tmp);
}
```

We can now return the array.

```javascript
return applets;
```



## [AppletDetails.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/AppletDetails.tsx)

The `AppletDetails` components is used to get informations about a service and take the service `slug` as parameter

```javascript
const AppletDetails = async (slug: string) : Promise<any>
```

We start by getting the `serverAddress` in the Async storage and the `token` in the Secure storage

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

We can now request the API at `GET /service/{slug}` and turn the result in a json.

```javascript
const response: Response =
    await fetch(`${serverAddress}/service/${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
const data: any = await response.json();
```
Now we just have to return the data
```javascript
return data;
```

In the case that the request failed we catch errors

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return null;
```

For more information about this file you can check his complete code here : [AppletDetails.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/AppletDetails.tsx)

## [OAuth.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/OAuth.tsx)

The `OAuthLogin` components is used to connect to the OAuth service by using the service slug.

```javascript
const OAuthLogin = async (service: string)
```

We start by create a redirect URI using `Linking`
```javascript
const redirectUri : string = Linking.createURL("/oauth2/" + service);
```

Then we create the function to open the Auth Session :
```javascript
const _openAuthSessionAsync = async () : Promise<void>
```
In this function we will start with getting the server address :
```javascript
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

Then we will get an `authToken` using [`TokenApi`](#servicetoken-tsx)

```javascript
const token : string = await TokenApi(service)
```

And with the `serverAddress` and the  `token` we can open an AuthSession in the web browser :
```javascript
await WebBrowser.openAuthSessionAsync(
    `${serverAddress}/service/${service}/oauth2?authToken=${token}&redirecturi=${redirectUri}`
);
```
For more information about this file you can check his complete code here : [OAuth.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/OAuth.tsx)

## [OAuthLogout.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/OAuthLogou.tsx)

The `OAuthLogout` components is used to delete the existing OAuth token for a service

```javascript
const OAuthLogout = async (service: string) : Promise<boolean>
```

We start by getting the `serverAddress` in the Async storage and the `token` in the Secure storage

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

We can now request the API at `DELETE/service/{service}/oauth2`.

```javascript
const response: Response =
    await fetch(`${serverAddress}/service/${service}/oauth2`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
```
Now we just have to return true if everything is good
```javascript
return true;
```

In the case that the request failed we catch errors and return false

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return false;
```

For more information about this file you can check his complete code here : [OAuthLogout.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/OAuthLogout.tsx)

## [ServiceToken.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/ServiceToken.tsx)

The function `ServiceToken` is an asynchronous function that retrieves a service token from an API endpoint using a provided slug.

```javascript
const ServiceToken = async (slug : string): Promise<string> 
```


We start by getting the `serverAddress` in the Async storage and the `token` in the Secure storage

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

Then we can make a request to the API `GET /service/{slug}/oauth2/token` and turn it into json.

```javascript
const response : Response = await fetch(`${serverAddress}/service/${slug}/oauth2/token`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
});
const json : any = await response.json();
```

We can finnaly return the data of the json
```javascript
return json.data
```

In the case that the request failed we catch errors and return false

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return false;
```

## [AutoLogin.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/AutoLogin.tsx)

The `AutoLogin` components is used to check if the user is login or not

```javascript
const AutoLoginAPI = async () : Promise<boolean>
```

We start by getting the `serverAddress` in the Async storage and the `token` in the Secure storage

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

Then we can make a request to the API passing the token in argument.

```javascript
const response : Response = await fetch(`${serverAddress}/user/verify?token=` + token, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
});
```
Finnaly we check if it's ok or not

```javascript
if (response.status == 204) {
    return true;
} else
    return false;
```


In the case that the request failed we catch errors

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return null;
```

For more information about this file you can check his complete code here : [AutoLogin.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/AutoLogin.tsx)

## [Login.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/Login.tsx)

The `LoginAPI` component is used to call the api to login the user while knowing the `email` and the `password`.

```javascript
const LoginAPI  = async (email: string, password : string) : Promise<any>
```

We start by getting the `serverAddress`

```javascript
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

Then we can call `POST /user/login` and get result in json

```javascript
const response : Response = await fetch(`${serverAddress}/user/login`, {
    method: 'POST',
    headers: {
       'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
});
const json : any = await response.json();
```

Then we can store the token and return it.

```javascript
SecureStore.setItemAsync('token_api', json.data);
return json;
```

In the case that the request failed we catch errors

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return null;
```

For more information about this file you can check his complete code here : [Login.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/Login.tsx)

## [Register.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/Register.tsx)

The `RegisterAPI` component is used to call the api to login the user while knowing the `email`, `username` and the `password`.

```javascript
const RegisterAPI = async (email: string, password : string, username : string) : Promise<any> 
```

We start by getting the `serverAddress`

```javascript
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

Then we can call `POST /user/login` and get result in json

```javascript
const response : Response = await fetch(`${serverAddress}/user/register`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password, username}),
});
const json : any = await response.json();
```

Then we can store the token and return it.

```javascript
SecureStore.setItemAsync('token_api', json.data);
return json;
```

In the case that the request failed we catch errors

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return null;
```

For more information about this file you can check his complete code here : [Register.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/Register.tsx)

## [UserInfos.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/UserInfos.tsx)

The function `UserInfosAPI` is an asynchronous function that makes a GET request to a server endpoint `/user/me` with a token and server address, and returns the response data or displays an error message if there is an error.

```javascript
const UserInfosAPI  = async (token: string, serverAddress : string) : Promise<any>
```
We start by getting the `serverAddress` in the Async storage and the `token` in the Secure storage

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

We can now make a request to the API at `GET /user/me` and turn the result in json
```javascript
const response = await fetch(`${serverAddress}/user/me`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});
const json = await response.json();
```
Finnaly we return the result

```javascript
return json;
```

In the case that the request failed we catch errors

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return null;
```

For more information about this file you can check his complete code here : [UserInfos.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/PatchUser.tsx)

## [PatchUser.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/UserInfos.tsx)

The function `PatchUser` is an asynchronous function that sends a PATCH request to update user information (email, password, and username) to a server using the provided server address and token.

```javascript
const PatchUser = async (email: string | null, password : string | null, username : string | null)
```
We start by getting the `serverAddress` in the Async storage and the `token` in the Secure storage

```javascript
const token : string = await SecureStore.getItemAsync('token_api');
const serverAddress : string = await AsyncStorage.getItem('serverAddress');
```

Then we will create a `data` Object that contain all informations that should be update

```javascript
const data = {}
if (email != null) {
    data["email"] = email;
}
if (password != null) {
    data["password"] = password;
}
if (username != null) {
    data["username"] = username;
}
```

We can now make a request to the API at `PATCH /user/me` and turn the result in json
```javascript
const response = await fetch(`${serverAddress}/user/me`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
});
const json = await response.json();
```

Finnaly we return the result

```javascript
return json;
```

In the case that the request failed we catch errors

```javascript
if (error == 'TypeError: Network request failed') {
    Alert.alert('Error', 'Please verify your network connection or the server address in the settings.');
} else {
    Alert.alert('Error', 'An error occurred while trying to connect to the server. Please retry later.');
}
console.error(error);
return null;
```

For more information about this file you can check his complete code here : [PatchUser.tsx](https://github.com/maelbecel/ARea/blob/master/mobile/Area51/api/PatchUser.tsx)