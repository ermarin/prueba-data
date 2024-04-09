import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';

const Home = ({ store }) => {
  console.log(store.getState());
  const [results, setResults] = useState(null);

  useEffect(() => {
    axios.get('https://api.datos.gob.mx/v1/calidadAire?page=1&pageSize=5').then((res) => {
      setResults(res.data.results);
    }).catch((err) => console.log(err))
  }, []);

  return (
    <Box padding={10}>
      {results?.map((item, key) => {
        return (
          <Card key={key} border={'solid'} marginBottom={5}>
            {item?.stations?.map((items, key) => {
              return (
                <>
                <CardHeader key={key}>
                  <Heading size='md' colorScheme='purple'>{items?.name}</Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing={'4'}>
                    {items?.indexes.map((index, key) => {
                      return (
                        <Box key={key}>
                          <Heading size='xs'>{index?.scale}</Heading>
                          <Text fontSize='sm'>{index?.value}</Text>
                        </Box>
                      )
                    })}
                  </Stack>
                </CardBody>
                </>
              )
            })}
          </Card>
        )
      })}
    </Box>
  )
}

export default Home;