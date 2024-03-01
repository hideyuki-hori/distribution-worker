# Web Application Performance Optimization

![](/public/screenshot.png)

[DEMO](https://every.fail/distribution-worker)
This has been tested and confirmed to work only on the latest version of Chrome for MacBook Pro.

This repository demonstrates the optimization of web application performance focusing on minimizing rendering delays while efficiently handling various inputs and calculations. It leverages Web Workers for computation tasks and employs reactive programming with RxJS to simplify event management, ensuring high FPS during intensive processing.

For more details, please refer to the blog posts I've written:

- [on Zenn (in Japanese)]()
- [on Dev.to (in English)]()

# Features

- Web Workers: Offload heavy computations from the UI thread to maintain responsiveness.
- Reactive Programming: Utilize RxJS for streamlined event handling and data flow management.
- Visualization: Integrate camera inputs and mouse interactions visualized through Three.js and rendered on HTML canvas.
- Performance Insights: Explore the benefits of using Web Workers and reactive programming patterns for real-time data processing and UI updates.

# Getting Started

Before running or building the project, make sure to install the necessary dependencies:

```sh
npm install
```

To start the development server:

```sh
npm run dev
```

To build the project for production:

```sh
npm run build
```

# Technologies

- SolidJS: Chosen for its minimalistic approach and efficient rendering, ideal for intensive canvas operations.
- Three.js: Used for 3D visualizations, providing a rich set of features for graphical content.
- RxJS: Empowers the application with reactive programming capabilities, facilitating complex event handling and data streams.

# License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE.md) file for details.

# Contribution

Feel free to fork this repository and submit pull requests to contribute to the project. For major changes, please open an issue first to discuss what you would like to change.
