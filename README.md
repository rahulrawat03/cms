# Run

- Open the terminal and run `docker-compose build`.
- Once built, run `docker-compose up`.
- Client will start listening at port `3333` and server at port `4000`.

<video width="800" autoplay loop muted>
  <source src="assets/showcase.mp4" type="video/mp4">
</video>

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
