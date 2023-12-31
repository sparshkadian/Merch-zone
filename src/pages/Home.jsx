import { useState, useEffect, useContext } from 'react';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import UserContexts from '../Context/userContext';
import CreatorContexts from '../Context/creatorContext';

const Home = () => {
  // hardCoding creator Data for now
  const data = [
    {
      name: 'Christina',
      email: 'Christina@gmail.com',
      photo:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-…',
    },
    {
      name: 'Dave',
      email: 'dave@gmail.com',
      photo:
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-…',
    },
    {
      name: 'John',
      email: 'John@gmail.com',
      photo:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-…',
    },
  ];

  // const { addUser } = useContext(UserContexts);
  // const { creatorData, getCreatorPhoto } = useContext(CreatorContexts);
  const [filteredList, setFilteredList] = useState(data);

  const auth = getAuth();
  const user = {
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    photo: auth.currentUser.photoURL,
  };

  // On new user signup through firebase adding it to my DB as well -> not a good solution. Needs a fix
  // useEffect(() => {
  //   addUser(user);
  // }, []);

  const filterSearch = (e) => {
    const query = e.target.value;
    let updatedList = [...data];
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setFilteredList(updatedList);
  };

  return (
    <>
      <div className='flex flex-col items-center py-12 gap-5'>
        <p className='text-[2rem]'>Find Your Favourite Creator</p>
        <div className='w-4/5 sm:w-1/2 lg:w-[40%] flex items-center border-2 border-black'>
          <input
            onChange={filterSearch}
            type='text'
            className='input-text-field p-3 text-3xl w-[90%] focus:outline-none'
          />
          <div className='ml-4 lg:ml-7'>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className='cursor-pointer text-[20px]'
            />
          </div>
        </div>
      </div>

      <div className='user-grid py-12 w-4/5 m-auto grid gap-4 sm:gap-0 grid-cols-2 md:grid-cols-3'>
        {filteredList &&
          filteredList.map((creator, i) => {
            return (
              <div className='grid-item' key={i}>
                <Link to={`/merch/${creator.name}`}>
                  <img
                    src={creator.photo}
                    alt='Creator'
                    className='cursor-pointer rounded-full border-4 h-[180px] w-[180px]'
                    // onClick={() => {
                    //   getCreatorPhoto(creator.photo);
                    // }}
                  />
                </Link>
                <p>{creator.name}</p>
              </div>
            );
          })}
      </div>

      <div className='text-center'>
        {filteredList.length === 0 && (
          <p className='text-[2.5rem]'>No Creator Found :(</p>
        )}
      </div>
    </>
  );
};

export default Home;
