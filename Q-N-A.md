## 1. How does the algorithm cater to high volume writers, i.e. those who wrote a lot like 40 during the month? Do they get the same chance as low volume writers? When do they get happy? When do they get unhappy?

`Algorithm have some constraints, we can only the publish the writer number of tales for particular writer as followed by the calculation given below`

`number tales can be published for the writer = ((capacity of publishing)/(total number selected tales of all writer)) X (number of tales selected for particular writer)`

#### Example according to the given data

`number tales can be published for the writer = (300/563) * 72`

`number tales can be published for the writer = 38.3658 ~ 38 ` 

## 2. How does the algorithm cater to low volume writers, i.e. those who write say 5 times a month? When do they get happy? When do they get unhappy?

#### Low volume writer algorithms goes with similar calculation, but when it comes to writer who has written only one tale algorithm publishes that considering it as the writer is not experienced and new to the platform but stills get the tales selected so to increase their motivation and make them hooked to the application algorithm publishes their tale. 

## 3. If every month we get 500 new stories, but the total publishing slots remain at (30 x 10 = 300) per month, we will remain in an "excess volume scenario", please explain how does the algorithm do justice on a month by month basis?

#### Considering the this scenario algorithm divides the slots equally according to the number tales selected for the particular writer. So every writer gets justice as per the number of tales that got selected for the particular writer.