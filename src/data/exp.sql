select 
'{ "exp": ' + CONVERT(nvarchar(255), s.StatValue) + 
', "st": '+ CONVERT(nvarchar(255), case when s.LevelIncrease = 1 then 3 else 1 end) +
', "mst": '+ CONVERT(nvarchar(255), s.LevelIncrease) +
', "lvl": '+ CONVERT(nvarchar(255), (select top 1 sum(case when LevelIncrease = 1 then 1 else 0 end) from StatIncrease ss where ss.StatValue <= s.StatValue)) + 
' },'
  FROM StatIncrease as s order by StatValue