
// const API = "https://all-about-hair-backend.onrender.com/api/"
const API = "http://localhost:8081/api/";


// const getAuthHeader = () => {
//   return `Bearer ${localStorage.getItem('access_token')}`;
// }


export async function getHomepageDetails() {
    const response = await fetch(API + "admin/homepage");
    return response.json();
  }
  
export async function getServiceDetails() {
    const response = await fetch(API + "admin/services");
    return response.json();
}

export async function getServiceDetail(id) {
  const response = await fetch(API + `admin/services/${id}`);
  return response.json();
}

// export async function updateServiceDetail(id) {
//   const response = await fetch(API + `admin/services/update/${id}`);
//   return response.json();
// }

export async function createService(service) {
  const response = await fetch(
    API + `admin/services/new`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${access_token}`
    },
    body: JSON.stringify(service),
  }
);
  return response.json();
}

export async function deleteService(id) {
  const response = await fetch(
    API + `admin/services/${id}`,
  {
    method: "DELETE",
    body: JSON.stringify(id),
  }
);
  return response.json();
}


export async function getTeamDetails() {
    const response = await fetch(API + "admin/personel");
    return response.json();
}

export async function getTeamMemberDetail(id) {
  const response = await fetch(API + `admin/personel/${id}`);
  return response.json();
}

// export async function updateTeamMemberDetails(id) {
//   const response = await fetch(API + `admin/personel/update/${id}`);
//   return response.json();
// }

export async function updateTeamMemberDetails(data) {
  // const access_token = await data.access_token

  const response = await fetch(
      API + `admin/personel/update/${data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${access_token}`
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
}  

export async function createTeamMember(member) {
  const response = await fetch(
    API + `admin/personel/new`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${access_token}`
    },
    body: JSON.stringify(member),
  }
);
  return response.json();
}

export async function deleteTeamMember(id) {
  const response = await fetch(
    API + `admin/personel/${id}`,
  {
    method: "DELETE",
    body: JSON.stringify(id),
  }
);
  return response.json();
}


export async function getGalleryImages() {
    const response = await fetch(API + "admin/gallery");
    return response.json();
}

export async function getContactInfo() {
    const response = await fetch(API + "admin/contact");
    return response.json();
}


export async function updateHomepageDetails(data) {
    // const access_token = await data.access_token

    const response = await fetch(
        API + `admin/homepage/update/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${access_token}`
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  }

  export async function updateServiceDetails(data) {
    // const access_token = await data.access_token

    const response = await fetch(
        API + `admin/services/update/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${access_token}`
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  }  