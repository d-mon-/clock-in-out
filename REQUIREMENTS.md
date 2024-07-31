Description:

ClockUs is an idea I had while working at meetsmore. My managers often complained about the
app not always responding to their needs.
I also got a bad expenrience personally too, where information were often hard to find on the Japanese Apps.
Or the process not being clear enough... Japanese usually love to display a lot of information on their website
but for these apps, it was the opposite...

- User authentication (possible SAML)
- tenant-based (organization > division > group)
- ACL
- Clock in, clock out feature
  - people being late, people being early
  - sending email to team manager (configurable)
  - core time / division or whole company
  - adding custom button (lunch break, clockin/out remotely, business trip, etc...)
    - Start-time, End-time, considered as working time or not
  - time correction (notify manager for approval if necessary)
  - PTO, leaves, etc...
    - PTO flow, PTO policy, filtering pto calendar (group/division, date, etc...), etc...
- calendar
- microservices:
  - sending email to manager/users daily / weekly
  - Generate report file (download link)
- I18N
- tests:
  - unit + integration (no need for E2E for now)
- optional: stripe, webhook, mobile first, google/microsft calendar

- Stack
  - Jest
  - postgresql
  - react
