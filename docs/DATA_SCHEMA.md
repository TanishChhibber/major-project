# IPL Data Schema Documentation

## Overview
This document describes the data schema used in the IPL Analytics Dashboard project.

## Data Sources

### 1. Matches Data (`ipl_matches_data.csv`)
Contains match-level information for all IPL matches.

**Columns:**
- `match_id` (integer): Unique identifier for each match
- `season_id` (integer): Season identifier (e.g., 2008, 2009, ...)
- `balls_per_over` (integer): Number of balls per over (typically 6)
- `city` (string): City where match was played
- `match_date` (string): Date of the match (DD-MM-YYYY format)
- `event_name` (string): Name of the event (Indian Premier League)
- `match_number` (integer): Match number within the season
- `gender` (string): Gender category (male)
- `match_type` (string): Type of match (T20)
- `format` (string): Cricket format (T20)
- `overs` (integer): Number of overs in the match
- `season` (string): Season year
- `team_type` (string): Team type (club)
- `venue` (string): Stadium/venue name
- `toss_winner` (string): Team that won the toss
- `team1` (string): First team name
- `team2` (string): Second team name
- `toss_decision` (string): Toss decision (bat/field)
- `match_winner` (string): Winning team
- `win_by_runs` (integer/null): Margin of victory by runs
- `win_by_wickets` (integer/null): Margin of victory by wickets
- `player_of_match` (string): Player of the match
- `result` (string): Match result (win/tie/no result)
- `stage` (string): Tournament stage

**Sample Record:**
```csv
335982,2008,6,Bangalore,18-04-2008,Indian Premier League,1,male,T20,T20,20,2008,club,M Chinnaswamy Stadium,Royal Challengers Bangalore,Royal Challengers Bangalore,Kolkata Knight Riders,field,Kolkata Knight Riders,140,NULL,46,win,
```

### 2. Teams Data (`teams_data.csv`)
Contains team information and logos.

**Columns:**
- `team_id` (integer): Unique team identifier
- `team_name` (string): Full team name
- `team_name_short` (string): Team abbreviation
- `image_url` (string): URL to team logo

**Sample Record:**
```csv
1,Royal Challengers Bangalore,RCB,https://documents.iplt20.com/ipl/RCB/Logos/Logooutline/RCBoutline.png
```

### 3. Ball-by-Ball Data (`ball_by_ball_data.csv`)
Contains detailed ball-by-ball information for all matches.

**Columns:**
- `season_id` (integer): Season identifier
- `match_id` (integer): Match identifier
- `batter` (string): Batsman name
- `bowler` (string): Bowler name
- `non_striker` (string): Non-striker batsman name
- `team_batting` (string): Batting team
- `team_bowling` (string): Bowling team
- `over_number` (integer): Over number
- `ball_number` (integer): Ball number within the over
- `batter_runs` (integer): Runs scored by batsman on this ball
- `extras` (integer): Extra runs on this ball
- `total_runs` (integer): Total runs on this ball
- `batsman_type` (string): Batsman type (Left hand Bat/Right hand Bat)
- `bowler_type` (string): Bowler type (Right arm Medium, etc.)
- `player_out` (string): Player who got out
- `fielders_involved` (string): Fielders involved in dismissal
- `is_wicket` (boolean): Whether wicket fell on this ball
- `is_wide_ball` (boolean): Whether it was a wide ball
- `is_no_ball` (boolean): Whether it was a no ball
- `is_leg_bye` (boolean): Whether it was a leg bye
- `is_bye` (boolean): Whether it was a bye
- `is_penalty` (boolean): Whether it was a penalty
- `wide_ball_runs` (integer): Runs from wide balls
- `no_ball_runs` (integer): Runs from no balls
- `leg_bye_runs` (integer): Leg bye runs
- `bye_runs` (integer): Bye runs
- `penalty_runs` (integer): Penalty runs
- `wicket_kind` (string): Type of dismissal
- `is_super_over` (boolean): Whether it was a super over
- `innings` (integer): Innings number

**Sample Record:**
```csv
2008,335982,SC Ganguly,P Kumar,BB McCullum,Kolkata Knight Riders,Royal Challengers Bangalore,0,0,0,1,1,Left hand Bat,Right arm Medium,NULL,NULL,FALSE,FALSE,FALSE,TRUE,FALSE,FALSE,0,0,1,0,0,NULL,FALSE,1
```

### 4. Players Data (`players-data-updated.csv`)
Contains player-specific information and statistics.

**Note:** This file had encoding issues in the original dataset. A proper CSV with player statistics should include:

**Expected Columns:**
- `player_id` (integer): Unique player identifier
- `player_name` (string): Player full name
- `team` (string): Current team
- `role` (string): Player role (Batsman, Bowler, All-rounder, Wicket-keeper)
- `batting_style` (string): Batting style
- `bowling_style` (string): Bowling style
- `nationality` (string): Player nationality
- `date_of_birth` (string): Player date of birth
- `matches_played` (integer): Total matches played
- `total_runs` (integer): Total runs scored
- `total_wickets` (integer): Total wickets taken
- `highest_score` (integer): Highest individual score
- `best_bowling` (string): Best bowling figures

## Data Relationships

### Primary Keys
- `match_id` in matches data
- `team_id` in teams data
- `player_id` in players data

### Foreign Keys
- `match_id` in ball-by-ball data references matches data
- `season_id` in matches and ball-by-ball data
- `team_batting` and `team_bowling` in ball-by-ball data reference teams data

## Data Quality Notes

### Known Issues
1. **Players Data Encoding**: The original players CSV had character encoding issues
2. **Missing Values**: Some matches may have NULL values for win_by_runs or win_by_wickets
3. **Venue Names**: Venue names may have variations and inconsistencies
4. **Team Names**: Some teams have changed names over seasons (e.g., Delhi Daredevils → Delhi Capitals)

### Data Cleaning Recommendations
1. Standardize venue names
2. Handle missing values appropriately
3. Create team name mapping for historical name changes
4. Validate player names across datasets

## Derived Metrics

### Season Statistics
- Total 6s: Count of balls where batter_runs = 6
- Total 4s: Count of balls where batter_runs = 4
- Total matches: Count of unique matches in season
- Total teams: Count of unique teams in season
- Centuries: Count of players scoring 100+ runs in a match
- Half centuries: Count of players scoring 50-99 runs in a match
- Total venues: Count of unique venues in season

### Player Statistics
- Orange Cap: Player with most runs in season
- Purple Cap: Player with most wickets in season
- Most 4s: Player with most boundaries (4s) in season
- Most 6s: Player with most sixes in season

### Points Table Calculation
- Played: Number of matches played by team
- Won: Number of matches won
- Lost: Number of matches lost
- NR: Number of no-result matches
- Tie: Number of tied matches
- Points: Won matches × 2 points
- NRR: Net Run Rate (complex calculation)

## API Response Schema

### Season Data Response
```json
{
  "seasonInfo": {
    "season": "2023",
    "champion": "Chennai Super Kings",
    "runnerUp": "Gujarat Titans",
    "startDate": "31-03-2023",
    "endDate": "29-05-2023"
  },
  "seasonStats": {
    "totalSixes": 872,
    "totalFours": 2156,
    "totalMatches": 74,
    "totalTeams": 10,
    "centuries": 12,
    "halfCenturies": 89,
    "totalVenues": 12
  },
  "playerStats": {
    "orangeCap": {
      "name": "Virat Kohli",
      "team": "Royal Challengers Bangalore",
      "runs": 736,
      "matches": 16,
      "average": 46.0
    },
    "purpleCap": {
      "name": "Mohammed Shami",
      "team": "Gujarat Titans",
      "wickets": 28,
      "matches": 17,
      "average": 15.3
    }
  },
  "pointsTable": [...],
  "charts": {
    "runsDistribution": [...],
    "boundaryAnalysis": [...],
    "topRunScorers": [...],
    "topWicketTakers": [...],
    "matchOutcomes": {...}
  }
}
```

## Usage Examples

### Querying Season Data
```sql
-- Get all matches for 2023 season
SELECT * FROM matches WHERE season = '2023';

-- Get top run scorers for 2023
SELECT 
  batter,
  SUM(batter_runs) as total_runs,
  COUNT(DISTINCT match_id) as matches
FROM ball_by_ball 
WHERE season_id = 2023 
GROUP BY batter 
ORDER BY total_runs DESC 
LIMIT 10;
```

### Calculating Points Table
```sql
-- Generate points table for a season
SELECT 
  team,
  COUNT(*) as played,
  SUM(CASE WHEN winner = team THEN 1 ELSE 0 END) as won,
  SUM(CASE WHEN winner != team AND result = 'win' THEN 1 ELSE 0 END) as lost,
  SUM(CASE WHEN result = 'no result' THEN 1 ELSE 0 END) as nr,
  SUM(CASE WHEN winner = team THEN 2 ELSE 0 END) as points
FROM (
  SELECT team1 as team, match_winner as winner, result FROM matches
  UNION ALL
  SELECT team2 as team, match_winner as winner, result FROM matches
) WHERE season = '2023'
GROUP BY team
ORDER BY points DESC;
```
