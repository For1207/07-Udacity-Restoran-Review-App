# Restaurant Reviews Website
---

## Project Overview

In this project we need to convert a static webpage to an offline-ready web
application. The task can be broken in three main categories:
  1. Convert the design to be responsive on different displays.
  2. Make the app accessible for screen reader use.
  3. A service worker needs to be added in order to create a seamless offline experience for users.

A starter code for a restaurant reviews website was provided.

## Implementation

### Convert the Design to Be Responsive

The website has three different layouts for three different viewport sizes: 600 px, 960 px and 1280 px. It makes it responsive on different sized displays.
In order to make the website's images responsive, three set of images was used: small, medium and large.

### Make the App accessible for Screen Readers

To make the website accessible for screen readers:
  1. `Alt` attribute was added to all images.
  2. Style of the links and buttons was changed, so users can spot links currently focused: `:hover` and `:focus` states has different colors.
  3. A 'skip link' is provided, it allows users to skip the map and go straight to the main content.
  4. Aria-lables, roles and links added according to ARIA recommendations.

### A Service Worker and Caches Added

The goal of the last stage of the project - make the website available for offline use.

  1. A service worker has been added in order to retrieve or cache resource requests.
  2. A separate cache for website's images created, so once an image has been cached once, the service worker can respond with it next time it's requested.
  3. A warning message that the website is offline and maps can not be displayed at the moment added.

  ### Hot to Start the website

1. In this folder, start up a simple HTTP server to serve up the site files on your local computer. Python has some simple tools to do this.

  - If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000`.
  - For Python 3.x, you can use `python3 -m http.server 8000`.

2. With your server running, visit the site: `http://localhost:8000`.

### References

1. [Udacity Project Instructions](https://review.udacity.com/#!/rubrics/1090/view)
2. [Responsive Images on MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
3. ["Skip Navigation" Links](https://webaim.org/techniques/skipnav/)
4. [ARIA Recommendations](https://webaim.org/techniques/aria/)
5. [ARIA live regions on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
6. [The offline cookbook by Jake Archibald](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/)
7. [A Walkthrough by Alexandro Perez](https://alexandroperez.github.io/mws-walkthrough/?1.28.handling-offline-maps-with-custom-content)
8. [Project 1 MWS Webinar with Doug Brown](https://www.youtube.com/watch?v=92dtrNU1GQc)
9. [Restaurant Reviews App, Stage 1 Walkthrough with Ryan Waite](https://www.youtube.com/watch?v=ag_jBDFAL0U&t=2433s)
