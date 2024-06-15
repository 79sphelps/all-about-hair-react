export async function getHomepageDetails() {
    const response = await fetch("https://all-about-hair-backend.onrender.com/api/admin/homepage");
    return response.json();
  }
  
export async function getServiceDetails() {
    const response = await fetch("https://all-about-hair-backend.onrender.com/api/admin/services");
    return response.json();
}

export async function getTeamDetails() {
    const response = await fetch("https://all-about-hair-backend.onrender.com/api/admin/personel");
    return response.json();
}