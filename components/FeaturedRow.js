import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import client from '../sanity'

export default function FeaturedRow({id, title, description, featuredCategory}) {

    const [restaurants, setRestaurants] = useState([])
    useEffect(() => {
        if(restaurants.length === 0){
            client.fetch(`
                *[_type == "featured" && _id == $id]{
                    ...,
                    restaurants[]->{
                        ...,
                        dishes[]->,
                        type-> {
                            name
                        }
                    },
                }[0]
            `,{ id }
            ).then(data => {
                setRestaurants(data?.restaurants)
            })
        }
        console.log("Res Count", restaurants.length)
    },[])
  
  return (
    <View className="px-4">
        <View className="mt-4 flex-row items-center justify-between">
            <Text className="font-bold text-lg">{title}</Text>
            <ArrowRightIcon color="#00CCBB"/>
        </View>
        <Text className="text-xs">{description}</Text>

        <ScrollView
            horizontal
            contentContainerStyle={{
                paddingHorizontal: 0,
            }}
            showsHorizontalScrollIndicator={false}
            className="pt-4"
        >
             {/* RestaurantsCards */}
             { restaurants?.map((restaurant,index) => (
                <RestaurantCard 
                    key={index}
                    id={restaurant._id}
                    imgUrl={restaurant.image}
                    title={restaurant.name}
                    rating={restaurant.rating}
                    genre={restaurant.type?.name}
                    address={restaurant.address}
                    short_description={restaurant.short_description}
                    dishes={restaurant.dishes}
                    long={restaurant.long}
                    lat={restaurant.lat}
                />
             ))}
        </ScrollView>
    </View>
  )
}