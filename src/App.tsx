import React, { Suspense, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import TaskCreator from './TaskCreator';
import Header from './Header';
import TaskList from './TaskList';

const queryClient = new QueryClient();

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 30,
    gap: 20,
  },
});

export default function App(): React.JSX.Element {
  const [init, setInit] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView>
        <View style={styles.container}>
          <Header onInit={setInit} />
          {init ? (
            <>
              <TaskCreator />
              <Suspense fallback={<Text>Loading...</Text>}>
                <TaskList />
              </Suspense>
            </>
          ) : (
            <Text>You Need Database</Text>
          )}
        </View>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
