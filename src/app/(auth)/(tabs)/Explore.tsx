import { View, StyleSheet ,  FlatList, ActivityIndicator } from 'react-native';
import {  responsiveScreenHeight as rh, responsiveWidth as rw, responsiveFontSize as rf } from 'react-native-responsive-dimensions';
import ShortVideo from '@/components/Explore/ShortVideo';
import React, { useCallback,  useState , useRef } from 'react';
import { useGetExperienceQuery } from '@/context/exploreContext/ExploreContext';
import { setActiveId } from '@/context/exploreContext/activeid';
import TopScnIcons from '@/components/Explore/TopScnIcons';
import { useAppDispatch } from '@/context/hooks';
import { MediumText } from '@/components/StyledText';
const Explore = () => {
  const dispatch = useAppDispatch();
  const [currentId, setCurrentId] = useState<number>(5);
  const flatListRef = useRef(null);
  const { data: responseData, isLoading, isError } = useGetExperienceQuery(currentId as number);

  const experiences = responseData?.Experiences || [];  
 
  const onViewCallBack = useCallback(({ viewableItems }) => {
    if (viewableItems.length === 0) {
      // Handle the case where there are no viewable items (optional)
      return;
    }
    
    const index = viewableItems[0].index;
    dispatch(setActiveId(index));
    
  }, [dispatch]);

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })
  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig: viewConfigRef.current, onViewableItemsChanged: onViewCallBack }]);
  return (
    <View style={styles.container} testID='explore-container'>
     {isLoading && <ActivityIndicator  testID='loading-indicator' />}
     {isError && 
     <View testID='error-message' style={{ justifyContent:"center" , alignItems:"center", width:rw(100), height:rh(100)}} >
       <MediumText style={{fontSize:rf(2)}}>Error occurred while fetching data</MediumText>
     </View>
       }
       <TopScnIcons/>
      <FlatList
       testID="experience-list"
       data={experiences}
       keyExtractor={(item) => item.ExperienceUUID}
       ref={flatListRef}
       renderItem={({ item , index }) => (
          <>
          <ShortVideo UUID={item?.ExperienceUUID}  Post={item?.EpicURL} id={index} Like={item?.Likes} Share={item?.Shares}   following={item.CreatorDetails?.IsFollowing} Profile={item.CreatorDetails?.ProfilePic} name={item.CreatorDetails?.Displayname}  Description={item?.EpicDescription} location={item?.Location}   Comment={item?.EpicComments?.length ?? 0} />
          </>
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}  
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        />
      
     </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    position:"relative",
    width:rw(100),
    height:rh(100),
  },
});

export default Explore;

function curr(value: Experience, index: number, array: Experience[]): unknown {
  throw new Error('Function not implemented.');
}


function dispatch(arg0: { payload: string; type: "GetActiveID/setActiveId"; }) {
  throw new Error('Function not implemented.');
}
