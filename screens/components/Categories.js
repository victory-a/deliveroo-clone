import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import CategoryCard from './CategoryCard';
import sanityClient from '../../sanity';
import { urlFor } from '../../sanity';

const Categories = () => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    sanityClient.fetch(`*[_type == "category"]`).then((data) => setCategories(data));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}>
      {/* category card */}
      {categories.map((category) => (
        <CategoryCard key={category._id} imgUrl={urlFor(category.image).width(200).url()} title={category.name} />
      ))}
    </ScrollView>
  );
};

export default Categories;
