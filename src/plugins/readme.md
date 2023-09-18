# Firestore api
## Insert data
### addDoc
Create a ``new collection`` and a ``document`` using the following example code.
```js
import { collection, addDoc } from "firebase/firestore"; 

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
```
### setDoc
```js
import { doc, setDoc } from "firebase/firestore"; 

// Add a new document in collection "cities"
await setDoc(doc(db, "cities", "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
});
```
If the document does not exist, it will be created. If the document does exist, its contents will be overwritten with the newly provided data, unless you specify that the data should be merged into the existing document, as follows:
```js
import { doc, setDoc } from "firebase/firestore"; 

const cityRef = doc(db, 'cities', 'BJ');
setDoc(cityRef, { capital: true }, { merge: true });
```
To update some fields of a document without overwriting the entire document or merged into the existing document, use updateDoc() instead.

Another, setDoc() can be use to create a document with a ``custom ID``.
```js
import { doc, setDoc } from "firebase/firestore"; 

await setDoc(doc(db, "cities", "new-city-id"), data);
```
For auto-generated IDs, use addDoc() instead.
### updateDoc
To update some fields of a document without overwriting the entire document
```js
import { doc, updateDoc } from "firebase/firestore";

const washingtonRef = doc(db, "cities", "DC");

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
    capital: true
});
```
#### Update fields in nested objects
If your document contains nested objects, you can use "dot notation" to reference nested fields within the document
```js
import { doc, setDoc, updateDoc } from "firebase/firestore";

// Create an initial document to update.
const frankDocRef = doc(db, "users", "frank");
await setDoc(frankDocRef, {
    name: "Frank",
    favorites: { food: "Pizza", color: "Blue", subject: "recess" },
    age: 12
});

// To update age and favorite color:
await updateDoc(frankDocRef, {
    "age": 13,
    "favorites.color": "Red"
});
```
#### Update elements in an array
arrayUnion() adds elements to an array but only elements not already present. 
arrayRemove() removes all instances of each given element.
```js
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const washingtonRef = doc(db, "cities", "DC");

// Atomically add a new region to the "regions" array field.
await updateDoc(washingtonRef, {
    regions: arrayUnion("greater_virginia")
});

// Atomically remove a region from the "regions" array field.
await updateDoc(washingtonRef, {
    regions: arrayRemove("east_coast")
});
```
#### Increment a numeric value
You can increment or decrement a numeric field value as shown in the following example.
```js
import { doc, updateDoc, increment } from "firebase/firestore";

const washingtonRef = doc(db, "cities", "DC");

// Atomically increment the population of the city by 50.
await updateDoc(washingtonRef, {
    population: increment(50)
});
```
### Batched writes
```js
import { writeBatch, doc } from "firebase/firestore";

// Get a new write batch
const batch = writeBatch(db);

// Set the value of 'NYC'
const nycRef = doc(db, "cities", "NYC");
batch.set(nycRef, {name: "New York City"});

// Update the population of 'SF'
const sfRef = doc(db, "cities", "SF");
batch.update(sfRef, {"population": 1000000});

// Delete the city 'LA'
const laRef = doc(db, "cities", "LA");
batch.delete(laRef);

// Commit the batch
await batch.commit();
```
### deleteDoc
#### Delete a document
```js
import { doc, deleteDoc } from "firebase/firestore";

await deleteDoc(doc(db, "cities", "DC"));
```
> **Warning:**
> Deleting a document does not delete its subcollections!

You can access the document at path /mycoll/mydoc/mysubcoll/mysubdoc even if you delete the ancestor document at /mycoll/mydoc.
#### Delete fields
```js
import { doc, updateDoc, deleteField } from "firebase/firestore";

const cityRef = doc(db, 'cities', 'BJ');

// Remove the 'capital' field from the document
await updateDoc(cityRef, {
    capital: deleteField()
});
```
## Read data
There are two main ways to retrieve data stored in Cloud Firestore.
+ Call a method to get the data once.
+ Set a listener to receive data-change events.

#### Retrieve a specific document.
```js
import { doc, getDoc } from "firebase/firestore";

const docRef = doc(db, "cities", "SF");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
} else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
}
```
#### Get all documents in a collection
```js
import { collection, getDocs } from "firebase/firestore";

const querySnapshot = await getDocs(collection(db, "cities"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
```
### Real time data
You can listen to a document with the onSnapshot() method. An initial call using the callback you provide creates a document snapshot immediately with the current contents of the single document. Then, each time the contents change, another call updates the document snapshot.
```js
import { doc, onSnapshot } from "firebase/firestore";

const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
    console.log("Current data: ", doc.data());
});
```
#### Events for local changes
When you perform a write, your listeners will be notified with the new data before the data is sent to the backend.
Retrieved documents have a metadata.hasPendingWrites property that indicates whether the document has local changes that haven't been written to the backend yet. You can use this property to determine the source of events received by your snapshot listener:
```js
import { doc, onSnapshot } from "firebase/firestore";

const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
  const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
  console.log(source, " data: ", doc.data());
});
```
#### Detach a listener
To detach a listener, invoke the function returned from onSnapshot().
```js
import { collection, onSnapshot } from "firebase/firestore";

const unsubscribe = onSnapshot(collection(db, "cities"), () => {
    // Respond to data
    // ...
});

// Later ...

// Stop listening to changes
unsubscribe();
```
### Handle listen errors
```js
import { collection, onSnapshot } from "firebase/firestore";

const unsubscribe = onSnapshot(
  collection(db, "cities"), 
  (snapshot) => {
    // ...
  },
  (error) => {
    // ...
  });
```
### withConverter
```js
class City {
    constructor (name, state, country ) {
        this.name = name;
        this.state = state;
        this.country = country;
    }
    toString() {
        return this.name + ', ' + this.state + ', ' + this.country;
    }
}

const cityConverter = {
    toFirestore: (city) => {
        return {
            name: city.name,
            state: city.state,
            country: city.country
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new City(data.name, data.state, data.country);
    }
};

import { doc, getDoc} from "firebase/firestore";

const ref = doc(db, "cities", "LA").withConverter(cityConverter);
const docSnap = await getDoc(ref);
if (docSnap.exists()) {
    // Convert to City object
    const city = docSnap.data();
    // Use a City instance method
    console.log(city.toString());
} else {
    console.log("No such document!");
}
```
## Theory
### Data model
[https://firebase.google.com/docs/firestore/data-model](https://firebase.google.com/docs/firestore/data-model)

Example chat app with messages and chat rooms

    rooms
        roomA
            name : "my chat room"
            messages
                message1
                    from : "alex"
                    msg : "Hello World!"
                message2
                    ...
        roomB
            ...

In this example, you would create a reference to a message in the subcollection with the following code:
```js
import { doc } from "firebase/firestore"; 

const messageRef = doc(db, "rooms/roomA/messages/message1");
```
### Data types
Data types
Cloud Firestore lets you write a variety of data types inside a document, including strings, booleans, numbers, dates, null, and nested arrays and objects. Cloud Firestore always stores numbers as doubles, regardless of what type of number you use in your code.
```js
import { doc, setDoc, Timestamp } from "firebase/firestore"; 

const docData = {
    stringExample: "Hello world!",
    booleanExample: true,
    numberExample: 3.14159265,
    dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
    arrayExample: [5, true, "hello"],
    nullExample: null,
    objectExample: {
        a: 5,
        b: {
            nested: "foo"
        }
    }
};
await setDoc(doc(db, "data", "one"), docData);
```
### Query
```js
import { collection, query, where, getDocs } from "firebase/firestore";
// Create a query against the collection.
const q = query(collection(db, "cities"), where("capital", "==", true));

// Execute a query
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
```
You can also add a listener to a query to get the current results and listen for future updates.
#### Query Operators
Query operators
The where() method takes three parameters: a field to filter on, a comparison operator, and a value. Cloud Firestore supports the following comparison operators:
- < less than
- <= less than or equal to
- == equal to
- \> greater than
- \>= greater than or equal to
- != not equal to
- array-contains
- array-contains-any
- in
- not-in
### Compound (AND) queries
You can perform range ``<``, ``<=``, ``>``, ``>=`` or not equals ``!=`` comparisons only on a single field, and you can include at most one array-contains or array-contains-any clause in a compound query:
```js
//***VALID*** Range filters on only one field
import { query, where } from "firebase/firestore";

const q1 = query(citiesRef, where("state", ">=", "CA"), where("state", "<=", "IN"));
const q2 = query(citiesRef, where("state", "==", "CA"), where("population", ">", 1000000));

//***INVALID*** Range filters on different fields
import { query, where } from "firebase/firestore";

const q = query(citiesRef, where("state", ">=", "CA"), where("population", ">", 100000));
```
### OR queries
```js
const q = query(citiesRef,  
  or(where('capital', '==', true),
     where('population', '>=', 1000000)
  )
);
```
You can combine OR queries with compound queries to filter on combinations of OR and AND operations. For example:
```js
const q = query(collection(db, "cities"), and(
  where('state', '==', 'CA'),   
  or(
    where('capital', '==', true),
    where('population', '>=', 1000000)
  )
));
```
### Order and limit data
```js
import { query, orderBy, limit } from "firebase/firestore";  

const q = query(citiesRef, orderBy("name"), limit(3));
```
You could also sort in descending order to get the last 3 cities:
```js
import { query, orderBy, limit } from "firebase/firestore";  

const q = query(citiesRef, orderBy("name", "desc"), limit(3));
```
You can also order by multiple fields. For example, if you wanted to order by state, and within each state order by population in descending order:
```js
import { query, orderBy } from "firebase/firestore";  

const q = query(citiesRef, orderBy("state"), orderBy("population", "desc"));
```
You can combine where() filters with orderBy() and limit(). In the following example, the queries define a population threshold, sort by population in ascending order, and return only the first few results that exceed the threshold:
```js
import { query, where, orderBy, limit } from "firebase/firestore";  

const q = query(citiesRef, where("population", ">", 100000), orderBy("population"), limit(2));
```
If you include a filter with a range comparison (<, <=, >, >=), your first ordering must be on the same field:
```js
//*** VALID ***
import { query, where, orderBy } from "firebase/firestore";

const q = query(citiesRef, where("population", ">", 100000), orderBy("population"));

//*** INVALID ***
import { query, where, orderBy } from "firebase/firestore";

const q = query(citiesRef, where("population", ">", 100000), orderBy("country"));
```
### Paginate
##### Cursor
```js
import { query, orderBy, startAt } from "firebase/firestore";  

const q = query(citiesRef, orderBy("population"), startAt(1000000));
```
##### Advanced pagination
```js
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";  

// Query the first page of docs
const first = query(collection(db, "cities"), orderBy("population"), limit(25));
const documentSnapshots = await getDocs(first);

// Get the last visible document
const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
console.log("last", lastVisible);

// Construct a new query starting at this document,
// get the next 25 cities.
const next = query(collection(db, "cities"),
    orderBy("population"),
    startAfter(lastVisible),
    limit(25));
```
### Aggregation
```js
const coll = collection(db, "cities");
const q = query(coll, where("state", "==", "CA"));
const snapshot = await getCountFromServer(q);
console.log('count: ', snapshot.data().count);
```
***Warning: You cannot currently use count() queries with real-time listeners and offline queries.***

***Limitations***
- Only a single not-in or !=` is allowed per query.
- In a compound query, range ``<``, ``<=``, ``>``, ``>=`` and not equals ``!=``, ``not-in`` comparisons must all filter on the same field.
- You can use at most one ``array-contains`` clause per disjunction (or group). You can't combine ``array-contains`` with ``array-contains-any`` in the same disjunction.
- not-in supports up to ``10`` comparison values.
- Cloud Firestore limits a query to a maximum of 30 disjunctions in disjunctive normal form.
More details about counting disjunctions in a query [Detail Here](https://firebase.google.com/docs/firestore/query-data/queries#web-modular-api_12)

