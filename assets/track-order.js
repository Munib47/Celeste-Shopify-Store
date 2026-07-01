async function getData(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "u1": "eyJib2R5Ijoic3R1ZmYiLCJpYXQiOjE2MDA5NDE0NzB9",
        "u2": "5gbipxthGI70mrbQ2MrhABnFNTWopBtT2AieIJkayEY"
      }
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json)
    if (json && json.result.length > 0) {
      document.querySelector('.track-order-result').innerHTML = json.result[0].message.split('\n')[1].split(':')[1];
    }
  } catch (error) {
    console.error(error.message);
  }
}

const trackOrderForm = document.querySelector('.track-order-form');

trackOrderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (trackOrderForm.querySelector('#order_no').value) {
    trackOrderForm.classList.remove('active');
    const url = `https://api2.master.com.pk/itx_oe?oe=${trackOrderForm.querySelector('#order_no').value}`;
    getData(url);
  } else if (trackOrderForm.querySelector('#phone_no').value) {
    trackOrderForm.classList.remove('active');
    const url = `https://api2.master.com.pk/itx_oe?phone=${trackOrderForm.querySelector('#phone_no').value}`;
    getData(url);
  } else {
    trackOrderForm.classList.add('active');
  }
});
