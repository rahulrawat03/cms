# Run

- Open the terminal and run `docker-compose build`.
- Once built, run `docker-compose up`.
- Client will start listening at port `3333` and server at port `4000`.

https://github.com/rahulrawat03/cms/assets/65608934/865452d5-2b21-466a-b706-cae91caaa75c

# About

This is a headless CMS with client tool to manage the content interactively.

### Document

This is the top level item in the schema hierarchy.
Each `document` needs to have an identifier that references one of its `string` properties. This identifier is used to query the document.

```js
  {
    type: <custom_type>,
    as: "document",
    identifier: <referenced_property_name>,
    properties: [
      {
        type: <value_type>, // string | number | image | file | array | <custom_type>
        name: <property_name>
      }
    ]
  }
```

### Object

This is an item composed of other schema items providing the flexibility of creating nested structures.

```js
  {
    type: <custom_type>,
    as: "object",
    properties: [
      {
        type: <value_type>, // string | number | image | file | array | <custom_type>
        name: <property_name>
      }
    ]
  }
```

### Primitives

These are the basic types using which complex schema can be created.  
There are five of these foundation types :

- `string`
- `number`
- `image`
- `file`
- `array`

# Example

Let's design the schema for a movie information service.

### Movie

Since the service is all about the movies, this will be core entity of our service.
A movie can have attributes like `title`, `rating`, `genre`, `poster`, `trailer`, `languages`, `country` and many more. Let's concentrate on first five attributes for now.

```js
  {
    type: "movie",
    as: "document",
    identifier: "title",
    properties: [
      {
        name: "title",
        type: "string",
      },
      {
        name: "rating",
        type: "number",
      },
      {
        name: "genre",
        type: "array",
      },
      {
        name: "poster",
        type: "image",
      },
      {
        name: "trailer",
        type: "file"
      },
    ],
  }
```

The schema defines a `document` of type `movie` and uses all the primitive types offered by the CMS for explanation. Notice that the `genre` is of type `array` since a single movie can belong to multiple genres.

This is how the schema looks right now in the client tool.
<img src="./assets/movie_document.png" width="600" />

### Actor

Actors are one of the most important attribute of a movie but `actor` entity itself can have much more to it apart from just a name. So, we cannot define an `actor` using one of our primitive types. This is where we make use of `object` to create a schema type specific to our use-case using the foundation types.

```js
  {
    type: "actor",
    as: "object",
    properties: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "totalMovies",
        type: "number",
      },
      {
        name: "popularMovies",
        type: "array"
      },
    ],
  }
```

Once added in registry, `actor` can be used just like any other type. Let's try adding it to the `movie` document.

```js
  {
    type: "movie",
    as: "document",
    identifier: "title",
    properties: [
      // ... previously added properties,
      {
        name: "leadActor",
        type: "actor",
      }
    ],
  }
```

We can see the corresponding change on the client.  
<img src="./assets/movie_document.png" width="600" />
