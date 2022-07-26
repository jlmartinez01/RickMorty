import { useNavigation } from '@react-navigation/native';
import React, { Component, useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { View, Alert, Dimensions, FlatList, RefreshControl, StyleSheet,TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ServiceGetCharactersPerPage } from '../../../services/Services';
import SearchCard from '../../../components/Search/SearchCard';
import { colorPrimario, colorSecundario } from '../../../values/colors';
import { ActivityIndicator } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

export default function Search() {
  const navigation = useNavigation();
  const [isloading, setLoading] = useState(false)
  const [personajes, setPersonajes] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(true)
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true)
  const [page, setPage] = useState(1)
  const [scrollPositionZero, setScrollPositionZero] = useState(true)
  const refFlatList = useRef(FlatList);

  useEffect(() => {
    loadPersonajes(true, page)
  }, []);

  function loadPersonajes(refreshing, page) {
    if (!refreshing) {
      setLoading(true)
    }
    
    console.log(page)
    ServiceGetCharactersPerPage(page)
      .then((res) => {
        if (res.results != undefined) {
          const personajesCargados = res.results
          handlePersonajes(refreshing,personajesCargados)
        }
        else {
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

  function handlePersonajes(refreshing,array_personajes) {
    if(refreshing)
    {
      setPersonajes(array_personajes)
    }
    else
    {
      setPersonajes([...personajes, ...array_personajes])
    }
    setIsRefreshing(false);
    setLoading(false)
  }

  const handleLoadMore = () => {
    if (hasMoreToLoad) {
      if (!isRefreshing) {
        setPage(page + 1)
        console.log('hola')
        loadPersonajes(false, page + 1);
      }
    }
  }

  const handleLoadRefresh = () => {
    setIsRefreshing(true)
    setPersonajes([])
    setPage(1)
    loadPersonajes(true, 1)
  }

  const renderItem = useCallback(({ item }) => <SearchCard props={item} />, [])

  const keyExtractor = useCallback((item) => item.id, [])

  const handlerScroll = useCallback((e) => {
    if(setScrollPositionZero && (e.nativeEvent.contentOffset.y)!=0)
    {
      setScrollPositionZero(false)
    }
    else
    {
      setScrollPositionZero(true)
    }
  },[])

  const handlerToUp = () =>{
    refFlatList.current.scrollToOffset({x: 0, y: 0, animated: true});
  }

  const renderIndicator = useMemo(() => {
    return (
      isloading
        ?
        <View style={styles.indicatorView}>
          <ActivityIndicator
            animating={true}
            color={colorSecundario}
          />
        </View>

        :
        null
    )
  }, [isloading])

  const RenderRefreshControl  = useMemo(() => {
    return(
    <RefreshControl
        tintColor='white'
        refreshing={isRefreshing}
        onRefresh={handleLoadRefresh}
      />
    )
  },[isRefreshing])

  const ButtonToUp = () => {
    return(
      !scrollPositionZero
      ?
      <TouchableOpacity onPress={handlerToUp} activeOpacity={.8} style={styles.buttonUpStyle}>
        <AntDesignIcon size={25} color={colorPrimario} name='caretup'/>
      </TouchableOpacity>
      :
      null
    )
  }


  return (
    <LinearGradient colors={['#fff',colorPrimario]} style={styles.contain}>
      <FlatList
        ref={refFlatList}
        showsVerticalScrollIndicator={false}
        refreshControl={RenderRefreshControl}
        data={personajes}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReachedThreshold={2}
        onEndReached={handleLoadMore}
        maxToRenderPerBatch={7}
        ListFooterComponent={renderIndicator}
        onScroll={handlerScroll}
      />
      <ButtonToUp/>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  contain:{
    flex: 1, 
  },
  indicatorView:{
    padding:5
  },
  buttonUpStyle:{
    height:50,
    width:50,
    borderRadius:50,
    backgroundColor:colorSecundario,
    position:'absolute',
    bottom:5,
    right:5,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    justifyContent:'center',
    alignItems:'center'
  }
})