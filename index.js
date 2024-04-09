async function submitData(name, email) {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email
        })
      });
  
      if (!response.ok) {
        throw new Error('Request failed');
      }
  
      const responseData = await response.json();
      document.body.innerHTML += responseData.id;
    } catch (error) {
      document.body.innerHTML += error.message;
    }
  }
  