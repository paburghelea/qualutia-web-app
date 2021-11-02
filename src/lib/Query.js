export const userQuery = `*[_type == "user" && name == "Paul-Andrei Burghelea"]{
    _id,
    name,
  
    skills[]{
      name,
      type,
      description,
      icon{
        asset{
          _ref
        }
      }
    }
    
  }`;
  
export const postsQuery = `*[_type == "post"]{
    _id,
    dates{
        start,
        end
    },
    name,
    description,
    group,
    slug,
    gallery[]{
      group,
      height,
      width,
      title,
      image{
        asset{
          _ref
        }
      }
    }
  }`;
  