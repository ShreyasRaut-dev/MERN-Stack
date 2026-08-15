let studntsAray = [
  {
    name: "Riya Sharma",
    marks: "85%",
    class: "10th",
    address: "123, ABC Colony, Delhi"
  },
  {
    name: "Rohan Patel",
    marks: "70%",
    class: "12th",
    address: "456, XYZ Street, Mumbai"
  },
  {
    name: "Rajesh Singhania",
    marks: "92%",
    class: "9th",
    address: "555, VWX Street, Jaipur"
  },
  {
    name: "Amit Kumar",
    marks: "78%",
    class: "11th",
    address: "789, LMN Marg, Pune"
  },
  {
    name: "Priya Patel",
    marks: "88%",
    class: "10th",
    address: "246, GHI Road, Ahmedabad"
  },
  {
    name: "Arjun Singh",
    marks: "65%",
    class: "12th",
    address: "135, JKL Lane, Kolkata"
  },
  {
    name: "Sneha Reddy",
    marks: "82%",
    class: "11th",
    address: "987, PQR Lane, Hyderabad"
  },
  {
    name: "Vikram Malhotra",
    marks: "90%",
    class: "10th",
    address: "654, MNO Road, Chennai"
  },
  {
    name: "Ananya Sen",
    marks: "95%",
    class: "12th",
    address: "321, DEF Lane, Bangalore"
  },
  {
    name: "Sandeep Gupta",
    marks: "60%",
    class: "9th",
    address: "159, RST Colony, Indore"
  },
  {
    name: "Pooja Verma",
    marks: "87%",
    class: "10th",
    address: "753, UVW Marg, Lucknow"
  },
  {
    name: "Manish Joshi",
    marks: "74%",
    class: "11th",
    address: "852, OPQ Street, Bhopal"
  },
  {
    name: "Neha Nair",
    marks: "81%",
    class: "12th",
    address: "951, ABC Lane, Kochi"
  },
  {
    name: "Rahul Bose",
    marks: "68%",
    class: "9th",
    address: "357, CDE Street, Patna"
  },
  {
    name: "Divya Deshmukh",
    marks: "89%",
    class: "10th",
    address: "456, FGH Colony, Nagpur"
  }
];

function renderCrads(arayToRender) {
  let cradsContainer = document.getElementById("crads-container");
  
  let htmlCards = arayToRender.map(function(studnt) {
    return '<div class="studnt-crad">' +
      '<div class="crad-title">' + studnt.name + '</div>' +
      '<div class="crad-info"><span>Marks:</span> ' + studnt.marks + '</div>' +
      '<div class="crad-info"><span>Class:</span> ' + studnt.class + '</div>' +
      '<div class="crad-info"><span>Addres:</span> ' + studnt.address + '</div>' +
    '</div>';
  });

  cradsContainer.innerHTML = htmlCards.join("");
}

function filterrStudnts() {
  let serchInpt = document.getElementById("serch-inpt");
  let queryText = serchInpt.value;
  
  let querySpan = document.getElementById("serch-query");
  querySpan.innerText = queryText;

  let filteredStudnts = studntsAray.filter(function(studnt) {
    return studnt.name.toLowerCase().includes(queryText.toLowerCase());
  });

  renderCrads(filteredStudnts);
}

renderCrads(studntsAray);
