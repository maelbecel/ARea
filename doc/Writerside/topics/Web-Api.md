# Web-Api

Here we have all components for API calls.
* [/action/\{slug}](#action-ts) [**GET**]
* [/action/info/\{slug}](#actioninfo-ts) [**GET**]
* [/reaction/\{slug}/\{actionSlug}](#reaction-ts) [**GET**]
* [/reaction/info/\{slug}](#reactioninfo-ts) [**GET**]
***
* [/applet](#applet-ts) [**POST**]
* [/applet/\{id}](#appletid-ts) [**GET**]
* [/applet/\{id}](#deleteapplet-ts) [**DELETE**]
* [/applet/\{id}](#appletpatch-ts) [**PATCH**]
* [/applet/me](#appletme-ts) [**GET**]
***



## [Action.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/action/action.ts)

The function `GetActionInputs` is an asynchronous function that takes a `token` and `slug` parameter and returns a promise that resolves to an array of `Input` objects. It's used to have all inputs required by an action.
```typescript
const GetActionInputs = async (token: string, slug: string): Promise<any | null>
```

We start by checking the `token` and `slug` before calling the api.
```typescript
if (slug === null) {
    console.log("[GET] .../action/${slug}: slug is null");
    return null;
}
if (token === null) {
    console.log(`[GET] .../action/${slug}: token is null`);
    return null;
}
```

Then we ask the server on the route `GET /action/{slug}` to get the action info and turn it into a json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/action/${slug}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    }
});

const data = await response.json();
```

Now we return the data the we get. The data is build like :
* `slug`: The slug (string)are (`TEXT`, `NUMBER`, `SELECT`)
* `options`: Here is the different options if the type is `SELECT` (string[])
```typescript
return data?.data;
```

* `inputs`: The inputs list (Input[])

An input is build like :
* `name`: The name of the input (string)
* `label`: The label of the input (string)
* `type`: The type of the input (string), the different possibility
  In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
   console.log(`[GET] .../action/${slug} (Error: ${data?.status}): \"${data?.message}\".`);
   return null;
}
```

For more information about this file you can check his complete code here : [action.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/action/action.ts)

## [ActionInfo.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/action/info.ts)

The function `GetActionInfo` is an asynchronous function that retrieves information about an action using a provided `token` and `slug`, including authentication and error handling.
```typescript
const GetActionInfo = async (token: string, slug: string): Promise<any | null>
```

We start by checking the `token` and `slug` before calling the api.
```typescript
if (slug === null) {
    console.log("[GET] .../action/${slug}: slug is null");
    return null;
}
if (token === null) {
    console.log(`[GET] .../action/${slug}: token is null`);
    return null;
}
```

Then we ask the server on the route `GET /action/info/{slug}` to get the action info and turn it into a json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/action/info/${slug}`, {
    method: "GET",
    headers: {
       "Content-Type": "application/json",
       Authorization : `Bearer ${token}`
    }
});

const data = await response.json();
```

We return then the data from the json.
```typescript
return data?.data;
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
    console.log(`[GET] .../action/info/${slug} (Error: ${data?.status}): \"${data?.message}\".`);
    return null;
}
```

For more information about this file you can check his complete code here : [ActionInfo.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/action/info.ts)

## [Reaction.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/reaction/reaction.ts)

The function `GetReactionInputs` is an asynchronous function that retrieves placeholders from a server based on a given `slug` and `actionSlug`, using a `token` for authorization.
```typescript
const GetReactionInputs = async (token: string, slug: string, actionSlug: string): Promise<any | null>
``` 

We start by checking the `token`, `slug` and `actionSlug` before calling the api.
```typescript
if (slug === null || actionSlug === null) {
    console.log("[GET] .../reaction/${slug}/${actionSlug}: slug or actionSlug is null");
    return null;
}

if (token === null) {
    console.log(`[GET] .../reaction/${slug}/${actionSlug}: token is null`);
    return null;
}
```

Then we ask the server on the route `GET /reaction/{slug}/{actionSlug}` to get the reaction info.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/reaction/${slug}/${actionSlug}`, {
    method: "GET",
    headers: {
       "Content-Type": "application/json",
       Authorization : `Bearer ${token}`
    }
});

const data = await response.json();
```

Now we return the data the we get. The data is build like :
* `slug`: The slug (string)
* `inputs`: The inputs list (Input[])
* `placeholders`: All the placeholders that can be used in a input (any)

An input is build like :
* `name`: The name of the input (string)
* `label`: The label of the input (string)
* `type`: The type of the input (string), the different possibility are (`TEXT`, `NUMBER`, `SELECT`)
* `options`: Here is the different options if the type is `SELECT` (string[])
```typescript
return data?.data;
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
   console.log(`[GET] .../reaction/${slug}/${actionSlug} (Error: ${data?.status}): \"${data?.message}\".`);
   return null;
}
```

For more information about this file you can check his complete code here : [Reaction.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/reaction/reaction.ts)

## [ReactionInfo.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/reaction/info.ts)

The function `GetReactionInfo` is an asynchronous function that retrieves information about an action using a provided `token` and `slug`, including authentication and error handling.
```typescript
const GetReactionInfo = async (token: string, slug: string): Promise<any | null>
```

We start by checking the `token` and `slug` before calling the api.
```typescript
if (slug === null || actionSlug === null) {
   console.log("[GET] .../reaction/${slug}/${actionSlug}: slug or actionSlug is null");
   return null;
}

if (token === null) {
   console.log(`[GET] .../reaction/${slug}/${actionSlug}: token is null`);
   return null;
}
```

Then we ask the server on the route `GET /reaction/info/{slug}` to get the action info and turn it into a json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/reaction/${slug}/${actionSlug}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    }
});

const data = await response.json();
```

We return then the data from the json.
```typescript
return data?.data;
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
    console.log(`[GET] .../reaction/${slug}/${actionSlug} (Error: ${data?.status}): \"${data?.message}\".`);
    return null;
}
```

For more information about this file you can check his complete code here : [ReactionInfo.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/reaction/info.ts)

## [Applet.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

The function `CreateApplet` is an asynchronous function that takes in various parameters related to an applet, logs them to the console, and makes a POST request to a server with the provided data. Here are the different parameters:
* `token` is a `string`. It's allow the user to get authentificated by the api.
* `body` as `any`.
* `router` as `NextRouter`. It's allow the api to redirect the user, only, if the call succed.

`body` contain all is value:
* `name` is a `string`. It's literally the name of the applet you want to create.
* `actionSlug` is a `string`. It's the `slug` of the action of the applet.
* `actionInputs` is an `Input[]`. The `actionInputs` parameter is an array of objects that represent the inputs required for the action.
* `notifUser` is a `boolean`. It's for know if the applet create will send notification to the user when a event has proke.
* `reactions` is a `ReactionApplet[]`. The `reactions` parameters is an array of ReactionApplet that represent a reaction with `slug` and `inputs`.
  This function return `Promise<boolean>`, a boolean false in case of error, or the true on a succed.

```typescript
const CreateApplet = async (token: string, body: any, router: NextRouter): Promise<boolean>
```

We start by checking the `token` before calling the api.
```typescript
if (token === null) {
   console.log("[POST] .../applet: token is null");
   return false;
}
```

We can now send the request to `POST /applet` and get the result in json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/applet`, {
    method: "POST",
    headers: {
       "Content-Type": "application/json",
       Authorization : `Bearer ${token}`
    },
    body: JSON.stringify(body)
});

const data = await response.json();
```

We return then the data from the json.
```typescript
return data?.data;
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 201) {
    console.log(`[POST] .../applet (Error: ${data?.status}): \"${data?.message}\".`);
    return false;
}
```

For more information about this file you can check his complete code here : [Applet.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

## [AppletID.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

The `GetAppletWithID` components is used to get informations about an applet and take the user `token` and applet `id` as parameter

```typescript
const GetAppletWithID = async (token: string, id: string): Promise<any | null>
```

We start by checking the `token` before calling the api.
```typescript
if (id === null) {
    console.log(`[GET] .../applet/{id}: id is null`);
    return null;
}

if (token === null) {
    console.log(`[GET] .../applet/${id}: token is null`);
    return null;
}
```

We can now request the API at `GET /applet/{id}` and turn the result in a json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/applet/${id}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    }
});

const data = await res
```

Now we just have to return the json data
```typescript
return data?.data;
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
    console.log(`[GET] .../applet/${id} (Error: ${data?.status}): \"${data?.message}\".`);
    return null;
}
```

For more information about this file you can check his complete code here : [AppletID.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

## [DeleteApplet.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

The call `DeleteAppletWithID` is used to delete an applet by his `id`.
```typescript
const DeleteAppletWithID = async (token: string, id: string): Promise<boolean>
```

We start by checking the `token` and `id` before calling the api.
```typescript
const DeleteAppletWithID = async (token: string, id: string): Promise<boolean> => {
if (id === null) {
    console.log(`[DELETE] .../applet/{id}: id is null`);
    return false;
}

if (token === null) {
    console.log(`[DELETE] .../applet/${id}: token is null`);
    return false;
}
```

We can now request the API at `DELETE /applet/{id}`.
```typescript
await fetch(`${localStorage.getItem("address") as string}/applet/${id}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    }
});
```

For more information about this file you can check his complete code here : [DeleteApplet.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

## [AppletPatch.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

The function `UpdateAppletWithID` is an asynchronous function that takes in various parameters related to an applet, logs them to the console, and makes a PATCH request to a server with the provided data. Here are the different parameters:
* `token` is a `string`. It's allow the user to get authentificated by the api.
* `id` is a `string`. It's the id of the applet you want to update.
* `body` as `any`.

`body` contain all is value:
* `name` is a `string`. It's literally the name of the applet you want to create.
* `actionSlug` is a `string`. It's the `slug` of the action of the applet.
* `actionInputs` is an `Input[]`. The `actionInputs` parameter is an array of objects that represent the inputs required for the action.
* `notifUser` is a `boolean`. It's for know if the applet create will send notification to the user when a event has proke.
* `reactions` is a `ReactionApplet[]`. The `reactions` parameters is an array of ReactionApplet that represent a reaction with `slug` and `inputs`.
  This function return `Promise<boolean>`, a boolean false in case of error, or the true on a succed.
```typescript
const UpdateAppletWithID = async (token: string, id: string, body: object): Promise<boolean>
```

We start by checking the `token` and the `id` before calling the api.
```typescript
if (id === null) {
    console.log(`[PATCH] .../applet/{id}: id is null`);
    return false;
}

if (token === null) {
    console.log(`[PATCH] .../applet/${id}: token is null`);
    return false;
}
```

We can now send the request to `PATCH /applet/{id}` and get the result in json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/applet/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    },
    body: JSON.stringify(body)
});

const data = await response.json();
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
    console.log(`[PATCH] .../applet/${id} (Error: ${data?.status}): \"${data?.message}\".`);
    return false;
}
```

For more information about this file you can check his complete code here : [AppletPatch.tsx](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

## [UpdateApplet.tsx](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

Update an applet with a specific ID by sending a PATCH request to the server. With a function that take the user `token`, the applet `id` and the new `title`.
```typescript
const UpdateAppletTitleWithID = async (token: string, id: string, title: string ): Promise<boolean>
```

We start by checking the `token`, the `id` and the `title` before calling the api.
```typescript
if (id === null) {
    console.log(`[PATCH] .../applet/{id}: id is null`);
    return false;
}

if (token === null) {
    console.log(`[PATCH] .../applet/${id}: token is null`);
    return false;
}

if (title === null || title === "") {
    console.log(`[PATCH] .../applet/${id}: title is null`);
    return false;
}
```

We can now request the API at `PATCH /applet/{id}` and turn the result in a json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/applet/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    },
    body: JSON.stringify({
        name: title,
    })
});

const data = await response.json();
```

Now we just have to return the data from the json
```typescript
return json.data;
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
    console.log(`[PATCH] .../applet/${id} (Error: ${data?.status}): \"${data?.message}\".`);
    return false;
}
```

For more information about this file you can check his complete code here : [UpdateApplet.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

## [AppletMe.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/me.ts)

The `GetMyApplets` components is used to get informations about the applets of the user
```typescript
const GetMyApplets = async (token: string): Promise<any[]>
```

We start by checking the `token` before calling the api.
```typescript
if (token === null) {
    console.log(`[GET] .../applet/me: token is null`);
    return [];
}
```

We can now request the API at `GET /applet/me` and turn the result in a json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/applet/me`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    }
});

const data = await response.json();
```

Now we just have to return the data
```typescript
return data?.data;
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
    console.log(`[GET] .../applet/me (Error: ${data?.status}): \"${data?.message}\".`);
    return [];
}
```

For more information about this file you can check his complete code here : [AppletMe.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/me.ts)
