---
layout: post
title: Quick intro to React
author: wizarddos
category: programming
excerpt_separator: <!--more-->
---

Hello, how's life?

This time, I'd like to introduce you and refresh a bit of basics about **React**

We'll look into things like
- What is React?
- Who uses it?
- How to use it

And then we'll figure out where to learn it

All right - time for the intro
<!--more-->
## What is React?

**React** is a library for Javascript and Typescript, created to simplify the process of web-app creation. 

It was originally made by Meta (formerly facebook), yet at the moment it's [maintained by the community](https://github.com/facebook/react)

In React, as developers, we create and organize **components**, which then are rendered.
It also allows us to implement TDD principles in our projects and create unit tests with [react testing library](https://testing-library.com/docs/react-testing-library/intro/)
React has it's official webiste located under [https://react.dev](https://react.dev/) - there you can find everything about it

## How to run a piece of code in it?

Actually, there are 2 paths to go

1. Set up your own webpack and babel configs - configure your runtime manually
2. Use [create-react-app](https://create-react-app.dev/) package - run preconfigured runtime

To create such React project, let's choose the second method
```
$ npx create-react-app my-app
```
Then, we've got 2 important directories - `src` and `public`

![important directories](https://i.ibb.co/3B90BcG/obraz.png)
{: class="img-medium"}

In `public`, we store every static page. Like HTML, favicons, `robots.txt` or some more HTML

`src` however is a place for our react components and tests.

Now, when we have everything configured, organised and coded time to run the app!
```
$ npm start
```

That's how we create a development server on localhost for us to use and test our apps there

Now, how can we even write that code? Is it some magic, that no one understands?

## Basice code examples 

As React is built on components, we have 2 types of them

**Functional**- a prefered method
```jsx
function Video({ video }) {
  return (
    <div>
      <Thumbnail video={video} />
      <a href={video.url}>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </a>
      <LikeButton video={video} />
    </div>
  );
}
```

Or **class**
```jsx
class Greeting extends Component {
  render() {
    return (
        <div>
            <Thumbnail video={video} />
            <a href={video.url}>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
            </a>
            <LikeButton video={video} />
        </div>
    );
  }
}
```

As you see, we don't create HTML elements in typical, JS way. 
There are no `createElement()` calls, are there? 

That's because React uses **JSX**. That's an extension for JS, that improves readability of it.
JSX can be treated as HTML template embeded in JS code. These JSX tags are then converted to proper JS code by react


In addition, React can't render more than 1 element at a time. That's why we either need to make mess in HTML by adding useless divs and sections or use **React fragment**

```jsx
function UserData({ user, email }){
    return(
        <>
            <h1>Hello { user }</h1>
            <p>Your email { email }</p>
        </>
    )
}

```
There is also a dynamic part of react - **Hooks**

Wanna store some variables? No worries, that's what **`useState`** is for. 
Or maybe changing something on every component generation? Then **`useEffect`** is your perfect choice.

```jsx
function App() {
  const [times, setTimes] = useState(0);

  const click = () =>{
    setTimes(times + 1)
    console.log(times)
  }

  useEffect(()=>{
    alert("You clicked me")
  })
  return (
    <div className="App">
      <h1>You counted {times} times</h1>

      <button onClick={click}>Click me</button>
    </div>
  );
}
```

Last thing I'll mention is props passing. Let's say we want to greet user on our website

Then, we create a greetings compoment
```jsx
const Greeting = (props) => {
  return (
    <h1>Hello, {props.name} {props.lastName}!</h1>
  );
};
```

Then, to use it in our app, we pass those props just like HTML attributes. But in JSX
```jsx
const App = () => {
  return (
    <div>
      <Greeting name="John" lastName="Smith" />
      <Greeting name="Ava" lastName="Davis" />
    </div>
  );
};
```

Now, you've seen a little React. But where to learn more?

## Amazing sources

The best source I can recommend is [React's documentation](https://react.dev/learn). In well structurised modules, you'll find everything you need

If you don't feel confident enough with english, React has it's [docs translated into other languages](https://react.dev/community/translations) and fair ammount of in-progress translations

In addition. I've also heard that [Brian Holt's course](https://react-v8.holt.courses/) is great.

This [Github repository](https://github.com/flashohq/open-source-react-courses) stores fair amount of free courses as well
If you know some more, share them in the comments and I'll append them right below


## Conclusion

Thanks for reading. I hope you've enjoyed it and are a little bit familiar with it now

Every feedback is appreciated. Share it in the comments

Also, check out other posts such as
1. [When less is more: Understanding void elements in HTML.](https://wizarddos.github.io/blog/programming/2024/04/19/why-some-elements-dont-have-ending-tag.html)
2. [Ajax & Fetch - combining PHP and Javascript for infinite scroll](https://wizarddos.github.io/blog/programming/2024/04/02/php-javascript-ajax-fetch-infinite-scroll.html)
3. [Cleaning spaghetti in PHP](https://wizarddos.github.io/blog/programming/2024/02/23/cleaning-spaghetii-code-in-php.html)

Or just [look for something random](https://wizarddos.github.io/blog/random)

That's it. Again thanks for reading and see you next time