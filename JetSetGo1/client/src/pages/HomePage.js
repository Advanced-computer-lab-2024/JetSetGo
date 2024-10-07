import { Link } from "react-router-dom";

const  HomePage = () =>  {
    return (
      <div className="homepage">
        <h1>Welcome to the Travel App</h1>
        <div className="navigation-buttons">
          <Link to="/delete/:role"><button>User List</button></Link>
          <Link to="/tour-guide/itineraryManager"><button>Itinerary Manager</button></Link>
          <Link to="/admin/profile"><button>Admin Profile</button></Link>
          <Link to="/admin/delete-options"><button>Delete Options</button></Link>
          <Link to="/admin/add"><button>Add Admin</button></Link>
          <Link to="/edit/tourist/:id"><button>Edit Tourist</button></Link>
          <Link to="/profile/tourist/:id"><button>Tourist Profile</button></Link>
          <Link to="/create/tour-guides/:id"><button>Create Tour Guide Profile</button></Link>
          <Link to="/update-profile/tour-guides/:id"><button>Update Tour Guide Profile</button></Link>
          <Link to="/profile/tour-guides/:id"><button>Tour Guide Profile</button></Link>
          <Link to="/activities"><button>Activities</button></Link>
          <Link to="/itineraries"><button>Itineraries</button></Link>
          <Link to="/museums"><button>Museums</button></Link>
          <Link to="/historicalLocations"><button>Historical Locations</button></Link>
          <Link to="/productPage"><button>Product Listing</button></Link>
          {/**/}
          <Link to="/seller/products"><button> seller Product Listing</button></Link>
          <Link to="/admin/products"><button> admin Product Listing</button></Link>
          <Link to="/tourist/products"><button> tourist Product Listing</button></Link>
          <Link to="/seller/addProduct"><button>seller add product</button></Link>
          <Link to="/admin/addProduct"><button>admin add product </button></Link>
          <Link to="/seller/updateProduct/:id"><button> seller update product</button></Link>
          <Link to="/admin/updateProduct/:id"><button>admin update product</button></Link>
        </div>
      </div>
    );
  }

  export default HomePage