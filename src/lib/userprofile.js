import cuid from "cuid";

export default {
  getUserId: () => {
    let userId = localStorage.getItem("user");
    if (!userId) {
      const uid = cuid();
      localStorage.setItem("user", uid);
      return uid;
    } else {
      return userId;
    }
  }
};
