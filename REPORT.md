# CS-E4770 - Project 1

## 1. Setup

For this project, my implementation consists of:

```
A PostgreSQL database (PORT 5432)
```

```
A JavaScript express backend (PORT 4000)
A React frontend (PORT 3000)
```

```
A Python Flask backend (PORT 4001)
A React frontend (PORT 3001)
```

```
A Python FastApi backend (PORT 4002)
A React frontend (PORT 3002)
```


Each backend is connected to the same database, but has a unique (cloned) frontend. All of these component can be automatically started as docker compose services with the following command:

```sh
docker compose up
```

## 2. K6 Benchmarks and Log Files

Each frontend and backend has been benchmarked with **K6 for 120 seconds, with 30 virtual users**. The outputs for each run can be found in the `/benchmarks` directory, as well as the scripts that were used to produce them. Assuming you have K6 installed, to perform benchmarks, enter one of the subdirectories and run the following command:

```sh
k6 run benchmark.js
```

By modifying the `benchmark.js` file you can change what benchmarks are run.

## 3. Frontend Review

To state the obvious, since each backend uses the same replicated frontend, performing any kind of benchmarking on that page is entirely pointless. This is especially true since the backend and database are many orders of magnitude worse bottlenecks than the frontends. Regardless, since the instructions told us to specifically perform tests on "pages", so be it. The results can be found in `/benchmarks/frontends/` and are predictably similar, landing at roughly **~5170 requests per second** with zero failures.


## 4. Backend Review

The backend benchmarks paint a completely different picture, as can be seen from the log files in `/benchmarks/apis/`. While the Express frontend results looked fine, the backend was completely incapable of handling the workload, resulting in a >95.5\% failure rate for each endpoint. The Flask backend showed a huge improvement, only failing a few percentage points of requests towards the end of the benchmark. Finally, the FastApi backend performed more or less flawlessly by significantly raising the request rate as well as processing every request it received.


## 5. Thoughts and improvement ideas

As an experiment, I decided to make the `Express` backend intentionally bad by creating a new postgre client for each request. Clearly, this is a bad idea as it overloads and crashes the API almost immediately. I did try out `Connection Pools` as a replacement, which indeed stopped the API from crashing, but the throughput rate also tanked to a minuscule amount. Based on some brief reading, this could be greatly improved by tweaking the configuration on both the backend and database, and would therefore be my next recommended step.

I've liked using `FastApi` in previous courses, but the results here genuinely blew me away. It seems to have numerous built-in mechanisms that optimize and protect it from mediocre programmers. However, the python Postgre client also seems to work much better than the JavaScript equivalent, resulting in even more "free optimization" for both the `Flask` and FastApi endpoints. The primary thing that worries me with these solutions is the low write rate which, in my experience, can only be fixed by horizontal scaling of both the backend and database. Unfortunately, I'm not experienced enough with Postgre to know how easily it can be cluster scaled with tools such as `Kubernetes`. If it's very difficult or not particularly effective, then I would recommend picking another database solution such as Cassandra.

Finally, each API could reduce its traffic by a significant margin by coming up with a better url-shortening strategy. Currently when a new database entry is created, a randomized string is repeatedly generated and verified via database request until a unique string is found. If this was changed to something deterministic, like a hash function, all the extra verification checks could be avoided.