self.addEventListener('message', (event) => {
  console.log('Worker received:', event.data)
  self.postMessage('Hello from worker!')
})