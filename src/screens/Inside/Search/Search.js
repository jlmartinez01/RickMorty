import { useNavigation } from '@react-navigation/native';
import React, { Component, useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { View, Alert, Dimensions, FlatList, RefreshControl, StyleSheet, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ServiceGetCharactersPerPage, ServiceGetCharactersPerText } from '../../../services/Services';
import SearchCard from '../../../components/search/SearchCard';
import { colorPrimario, colorSecundario } from '../../../values/colors';
import { ActivityIndicator } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import SearchBar from '../../../components/search/SearchBar';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import RNKeyboardManager from 'react-native-keyboard-manager';

export default function Search() {
  const navigation = useNavigation();
  const [isloading, setLoading] = useState(false)
  const [personajes, setPersonajes] = useState([])
  const [arrayHolder, setArrayHolder] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(true)
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true)
  const [page, setPage] = useState(1)
  const [scrollPositionZero, setScrollPositionZero] = useState(true)
  const [textSearch, setTextSearch] = useState('')
  const [search, setSearch] = useState(false)
  const refFlatList = useRef(FlatList);

  useEffect(() => {
    onFocusEffect
    loadPersonajes(true, page)
  }, []);

  const onFocusEffect = useCallback(() => {
    if (Platform.OS !== 'ios') {
      AvoidSoftInput.setAdjustResize();
    } else {
      RNKeyboardManager.setEnable(true);
    }

    return () => {
      if (Platform.OS !== 'ios') {
        AvoidSoftInput.setDefaultAppSoftInputMode();
      } else {
        RNKeyboardManager.setEnable(false);
      }
    };
  }, []);

  function loadPersonajes(refreshing, page) {
    if (!refreshing) {
      setLoading(true)
    }
    ServiceGetCharactersPerPage(page)
      .then((res) => {
        if (res.results != undefined) {
          const personajesCargados = res.results
          handlePersonajes(refreshing, personajesCargados)
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

  function handlePersonajes(refreshing, array_personajes) {
    if (refreshing) {
      setPersonajes(array_personajes)
      setArrayHolder(array_personajes)
    }
    else {
      setPersonajes([...personajes, ...array_personajes])
      setArrayHolder([...personajes, ...array_personajes])
    }
    setIsRefreshing(false);
    setLoading(false)
  }

  function loadSearchPersonajes(text) {
    setLoading(true)
    ServiceGetCharactersPerText(text)
      .then((res) => {
        if (res.results != undefined) {
          const personajesCargados = res.results
          setPersonajes(personajesCargados)
        }
        else {
          setLoading(false)
        }

      })
      .catch((error) => {
        setLoading(false)
      });
  }

  const handleLoadMore = () => {
    if (hasMoreToLoad) {
      if (!isRefreshing) {
        setPage(page + 1)
        loadPersonajes(false, page + 1);
      }
    }
  }

  const handleLoadRefresh = () => {
    setIsRefreshing(true)
    setPersonajes([])
    setArrayHolder([])
    setPage(1)
    loadPersonajes(true, 1)
  }


  const renderItem = useCallback(({ item }) => <SearchCard props={item} onPress={()=>navigation.navigate('Details',item)} />, [])

  const keyExtractor = useCallback((item) => item.id, [])

  const handlerScroll = useCallback((e) => {
    if (setScrollPositionZero && (e.nativeEvent.contentOffset.y) != 0) {
      setScrollPositionZero(false)
    }
    else {
      setScrollPositionZero(true)
    }
  }, [])


  const handleOnChangeText = useCallback((text) => {
    setTextSearch(text)
    if (text.length > 1) {
      loadSearchPersonajes(text)
      setSearch(true)
    }
    else {
      setPersonajes(arrayHolder)
      setSearch(false)
    }
  })

  const handlerToUp = () => {
    refFlatList.current.scrollToOffset({ x: 0, y: 0, animated: true });
  }

  const handleClearText = () => {
    setTextSearch('')
    setPersonajes(arrayHolder)
    setSearch(false)
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

  const RenderRefreshControl = useMemo(() => {
    return (
      <RefreshControl
        tintColor='white'
        refreshing={isRefreshing}
        onRefresh={handleLoadRefresh}
      />
    )
  }, [isRefreshing])

  const renderSearchBar = useMemo(() => {
    return (
      <SearchBar
        onChangeText={handleOnChangeText}
        value={textSearch}
        onClearPress={handleClearText}
      />
    )
  }, [textSearch])

  const ButtonToUp = useMemo(() => {
    return (
      !scrollPositionZero
        ?
        <TouchableOpacity onPress={handlerToUp} activeOpacity={.8} style={styles.buttonUpStyle}>
          <AntDesignIcon size={25} color={colorPrimario} name='caretup' />
        </TouchableOpacity>
        :
        null
    )
  }, [scrollPositionZero])




  return (
    <LinearGradient colors={[colorSecundario, colorPrimario]} style={styles.contain}>
      {
        renderSearchBar
      }
      <View style={styles.viewFlatList}>
        <FlatList
          ref={refFlatList}
          showsVerticalScrollIndicator={false}
          refreshControl={!search ? RenderRefreshControl : null}
          data={personajes}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReachedThreshold={2}
          onEndReached={!search ? handleLoadMore : null}
          maxToRenderPerBatch={7}
          ListFooterComponent={!search ? renderIndicator : null}
          onScroll={handlerScroll}
        />
      </View>
      {
        ButtonToUp
      }
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },
  indicatorView: {
    padding: 5
  },
  buttonUpStyle: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: colorSecundario,
    position: 'absolute',
    bottom: 5,
    right: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewFlatList: {
    flex: 1
  }
})