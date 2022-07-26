import { useNavigation } from '@react-navigation/native';
import React, { Component, useState, useEffect, useMemo, useRef } from 'react';
import { View, Alert, Dimensions, FlatList, RefreshControl } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import { ServiceGetCharactersPerPage } from '../../../services/Services';
import SearchCard from '../../../components/Search/SearchCard';

export default function Search() {
  const navigation = useNavigation();

  const [screenHeight, setScreenHeight] = useState(ScreenHeight)
  const [isloading, setLoading] = useState(false)
  const [personajes, setPersonajes] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(true)
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadPersonajes(true,page)
  }, []);

  function loadPersonajes(refreshing,page) {
    if (!refreshing) {
      setLoading(true)
    }
    ServiceGetCharactersPerPage(page)
      .then((res) => {
          if(res.results!=undefined)
          {
            const personajesCargados = res.results
            handlePersonajes(personajesCargados)
          }
          else{
            setHasMoreToLoad(false)
            setIsRefreshing(false);
            setLoading(false)
          }
          
      })
      .catch((error) => {
        setHasMoreToLoad(false)
        setIsRefreshing(false);
        setLoading(false)
      });

  }

  function handlePersonajes(array_personajes) {
      let listData = personajes 
      const data = listData.concat(array_personajes)
      setPersonajes(data)
      setIsRefreshing(false);
      setLoading(false)
  }

  const handleLoadMore = () => {
    if (hasMoreToLoad) {
      if (!isRefreshing) {
        setPage(page+1)
        console.log('hola')
        loadPersonajes(false,page+1);
      }
    }
  }

  const handleLoadRefresh = () => {
    setIsRefreshing(true)
    setPersonajes([])
    setPage(1)
    loadPersonajes(true)
  }

  const renderRefreshControl = useMemo(() => {
    return (
      <RefreshControl
        tintColor='white'
        refreshing={isRefreshing}
      />
    )
  }, [isRefreshing])

  const renderItem=(item) =>{
      return <SearchCard props={item}/>

  }
  
  const handleHeight = (nativeEvent) => {
    setScreenHeight(nativeEvent.layout.height)
  }

  const renderFlatList = useMemo(() => {
    console.log('renderFlatlist')
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={true}
        onRefresh={handleLoadRefresh}
        refreshControl={renderRefreshControl}
        data={personajes}
        extraData={personajes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderItem(item)}
        onEndReachedThreshold={30}
        onEndReached={handleLoadMore}
      />
    )
  }, [isRefreshing,isloading])



  return (
    <View style={{ flex: 1 }}
      onLayout={({ nativeEvent }) => handleHeight(nativeEvent)}>
      {renderFlatList}
    </View>
  );
}