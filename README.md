# BOLT-ENDPONITS

# Driver signup
mutation {
  signupDriver(email: "driver@gmaiL.com", password: "pass1234", name: "John Doe", phone: "1234567890", licenseDetails: "XY123") {
    token
    user {
      id
      email
      role
      name
    }
  }
}

# login

mutation {
  login(email: "driver@gmaiL.com", password: "pass1234") {
    token
    user {
      id
      email
      role
    }
  }
}

# fetch user details with header authorization

mutation {
  login(email: "driver@gmaiL.com", password: "pass1234") {
    token
    user {
      id
      email
      role
    }
  }
}


# Courier signup

mutation {
  signupCourier(email: "courier@gmaiL.com", password: "pass1234", name: "Jane Doe", phone: "1234567880", vehicleType: "corolla") {
    token
    user {
      id
      email
      role
      name
    }
  }
}

# signupResturant

mutation {
  signupRestaurant(email: "resturant@gmail.com", password: "pass12", name: "John Doe", phone: "1234567890", businessName: "Lydia'scent") {
    token
    user {
      id
      email
      role
      name
    }
  }
}


# SIgnup as store

mutation {
  signupStore(email: "toria@gmaiL.com", password: "toriamichael", name: "toria michael", phone: "1234567890", businessName: "torias bouget") {
    token
    user {
      id
      email
      role
      name
    }
  }
}

# Signup as Fleetowner

mutation {
  signupFleetOwner(email: "rita@gmaiL.com", password: "ritassmichael", name: "Rita michael", phone: "1234567890", fleetDetails: "23456456") {
    token
    user {
      id
      email
      role
      name
    }
  }
}







