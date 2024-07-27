self.onmessage = (event) => {
    const data = event.data;
    // Perform some computations or tasks
    self.postMessage(`Received: ${data}`);
};