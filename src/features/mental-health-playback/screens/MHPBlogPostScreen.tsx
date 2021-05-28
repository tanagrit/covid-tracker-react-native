import { BasicPage } from '@covid/components';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { colors, styling } from '@covid/themes';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Linking, StyleSheet, View } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';
import UrlParse from 'url-parse';

const js = `
  pageContents = document.getElementsByClassName("page-content");
  if (pageContents.length > 0) {
    blogWrappers = pageContents[0].getElementsByClassName("blog-wrapper");
    if (blogWrappers.length > 0) {
      document.body.appendChild(blogWrappers[0]);
      pageContents[0].remove();
    }
  }

  document.querySelectorAll('body > *').forEach((element) => {
    if (!element.classList.contains('page-content') && !element.classList.contains('blog-wrapper')) {
      element.remove();
    }
  });
`;

const uri = 'https://covid.joinzoe.com/post/full-results-of-our-mental-health-survey';
const url = new UrlParse(uri);
const source = { uri };

export default function MHPBlogPostScreen() {
  const [loaded, setLoaded] = useState(false);
  const webView = useRef<WebView>(null);

  function onLoadEnd() {
    webView.current?.injectJavaScript(js);
    if (!loaded) {
      setTimeout(() => setLoaded(true), 250);
    }
  }

  function onNavigationStateChange(navState: WebViewNavigation) {
    try {
      const navUrl = new UrlParse(navState.url);
      if (navUrl.hostname !== url.hostname || navUrl.pathname !== url.pathname) {
        webView.current?.stopLoading();
        Linking.openURL(navState.url);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  }

  return (
    <BasicPage
      active
      footerTitle={i18n.t('continue')}
      onPress={() => NavigatorService.navigate('MentalHealthPlaybackRating')}
      style={styling.backgroundWhite}
    >
      <WebView
        injectedJavaScript={js}
        injectedJavaScriptBeforeContentLoaded={js}
        onLoad={() => webView.current?.injectJavaScript(js)}
        onLoadEnd={onLoadEnd}
        onNavigationStateChange={onNavigationStateChange}
        ref={webView}
        source={source}
      >
        {!loaded ? (
          <View style={styles.view}>
            <ActivityIndicator color={colors.coral.main.bgColor} size="large" />
          </View>
        ) : null}
      </WebView>
    </BasicPage>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    backgroundColor: 'white',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
});